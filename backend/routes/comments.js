const router = require('express').Router();
const { Comment, User, Post, Notification } = require('../models');
const { authRequired } = require('../middleware/auth');

// GET /api/comments?post_id=
router.get('/', async (req, res, next) => {
  try {
    const { post_id } = req.query;
    if (!post_id) return res.status(400).json({ error: 'post_id가 필요합니다' });
    const comments = await Comment.findAll({
      where: { post_id, parent_id: null },
      include: [
        { model: User, attributes: ['id', 'nickname', 'avatar', 'avatar_gradient', 'tier'] },
        { model: Comment, as: 'replies', include: [{ model: User, attributes: ['id', 'nickname', 'avatar', 'avatar_gradient', 'tier'] }] }
      ],
      order: [['created_at', 'ASC']]
    });
    res.json(comments);
  } catch (err) { next(err); }
});

// POST /api/comments
router.post('/', authRequired, async (req, res, next) => {
  try {
    const { post_id, body, parent_id } = req.body;
    const comment = await Comment.create({ post_id, user_id: req.user.id, body, parent_id });

    const post = await Post.findByPk(post_id);
    if (post && post.user_id !== req.user.id) {
      await Notification.create({
        user_id: post.user_id, type: 'community',
        title: `${req.user.nickname}님이 댓글을 남겼어요`,
        body: body.substring(0, 100)
      });
    }

    const full = await Comment.findByPk(comment.id, {
      include: [{ model: User, attributes: ['id', 'nickname', 'avatar', 'avatar_gradient', 'tier'] }]
    });
    res.status(201).json(full);
  } catch (err) { next(err); }
});

// DELETE /api/comments/:id
router.delete('/:id', authRequired, async (req, res, next) => {
  try {
    await Comment.destroy({ where: { id: req.params.id, user_id: req.user.id } });
    res.json({ success: true });
  } catch (err) { next(err); }
});

module.exports = router;
