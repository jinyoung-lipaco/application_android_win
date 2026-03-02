const router = require('express').Router();
const { Post, User, Reaction, Comment, Topic, MonthGroup, sequelize } = require('../models');
const { authRequired, authOptional } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { Op } = require('sequelize');

// GET /api/posts
router.get('/', authOptional, async (req, res, next) => {
  try {
    const { topic_id, month_group_id, popular, page = 1, limit = 20 } = req.query;
    const where = {};
    if (topic_id) where.topic_id = topic_id;
    if (month_group_id) where.month_group_id = month_group_id;
    if (popular === 'true') where.is_popular = true;

    const offset = (page - 1) * limit;
    const { rows, count } = await Post.findAndCountAll({
      where,
      include: [
        { model: User, attributes: ['id', 'nickname', 'avatar', 'avatar_gradient', 'tier'] },
        { model: Topic, attributes: ['id', 'name', 'icon'] },
        { model: MonthGroup, attributes: ['id', 'name'] }
      ],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset
    });

    const posts = await Promise.all(rows.map(async (post) => {
      const reactions = await Reaction.findAll({
        where: { post_id: post.id },
        attributes: ['type', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
        group: ['type']
      });
      const commentCount = await Comment.count({ where: { post_id: post.id } });
      return { ...post.toJSON(), reactions, commentCount };
    }));

    res.json({ posts, total: count, page: parseInt(page), totalPages: Math.ceil(count / limit) });
  } catch (err) { next(err); }
});

// GET /api/posts/:id
router.get('/:id', authOptional, async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['id', 'nickname', 'avatar', 'avatar_gradient', 'tier'] },
        { model: Topic }, { model: MonthGroup },
        { model: Comment, include: [{ model: User, attributes: ['id', 'nickname', 'avatar', 'avatar_gradient', 'tier'] }], order: [['created_at', 'ASC']] }
      ]
    });
    if (!post) return res.status(404).json({ error: '게시글을 찾을 수 없습니다' });
    await post.increment('view_count');

    const reactions = await Reaction.findAll({
      where: { post_id: post.id },
      attributes: ['type', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['type']
    });
    let myReactions = [];
    if (req.user) {
      myReactions = await Reaction.findAll({ where: { post_id: post.id, user_id: req.user.id }, attributes: ['type'] });
    }
    res.json({ ...post.toJSON(), reactions, myReactions: myReactions.map(r => r.type) });
  } catch (err) { next(err); }
});

// POST /api/posts
router.post('/', authRequired, upload.single('image'), async (req, res, next) => {
  try {
    const { body, tags, topic_id, month_group_id } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    const post = await Post.create({ user_id: req.user.id, body, tags, topic_id, month_group_id, image_url });
    const full = await Post.findByPk(post.id, {
      include: [{ model: User, attributes: ['id', 'nickname', 'avatar', 'avatar_gradient', 'tier'] }]
    });
    res.status(201).json(full);
  } catch (err) { next(err); }
});

// PUT /api/posts/:id
router.put('/:id', authRequired, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    if (!post) return res.status(404).json({ error: '게시글을 찾을 수 없습니다' });
    await post.update(req.body);
    res.json(post);
  } catch (err) { next(err); }
});

// DELETE /api/posts/:id
router.delete('/:id', authRequired, async (req, res, next) => {
  try {
    const deleted = await Post.destroy({ where: { id: req.params.id, user_id: req.user.id } });
    if (!deleted) return res.status(404).json({ error: '게시글을 찾을 수 없습니다' });
    res.json({ success: true });
  } catch (err) { next(err); }
});

// POST /api/posts/:id/reactions
router.post('/:id/reactions', authRequired, async (req, res, next) => {
  try {
    const { type } = req.body;
    const validTypes = ['empathy', 'funny', 'helpful', 'cheer', 'comment', 'share'];
    if (!validTypes.includes(type)) return res.status(400).json({ error: '유효하지 않은 반응 타입입니다' });

    const existing = await Reaction.findOne({ where: { post_id: req.params.id, user_id: req.user.id, type } });
    if (existing) {
      await existing.destroy();
      res.json({ toggled: false, type });
    } else {
      await Reaction.create({ post_id: req.params.id, user_id: req.user.id, type });
      res.json({ toggled: true, type });
    }
  } catch (err) { next(err); }
});

module.exports = router;
