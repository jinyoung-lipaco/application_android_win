const router = require('express').Router();
const { User, Child, Post, Reaction, UserVote, StarTransaction, UserBlock } = require('../models');
const { authRequired } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { Op } = require('sequelize');

// GET /api/users/me
router.get('/me', authRequired, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password_hash'] },
      include: [Child]
    });
    res.json(user);
  } catch (err) { next(err); }
});

// PUT /api/users/me
router.put('/me', authRequired, async (req, res, next) => {
  try {
    const { nickname, avatar, avatar_gradient, bio } = req.body;
    await User.update(
      { nickname, avatar, avatar_gradient, bio },
      { where: { id: req.user.id } }
    );
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password_hash'] } });
    res.json(user);
  } catch (err) { next(err); }
});

// GET /api/users/me/stats
router.get('/me/stats', authRequired, async (req, res, next) => {
  try {
    const postCount = await Post.count({ where: { user_id: req.user.id } });
    const voteCount = await UserVote.count({ where: { user_id: req.user.id } });
    const reactionCount = await Reaction.count({ where: { user_id: req.user.id } });
    const user = await User.findByPk(req.user.id);

    const daysSince = Math.floor((Date.now() - new Date(user.member_since)) / 86400000);

    res.json({
      posts: postCount,
      votes: voteCount,
      reactions: reactionCount,
      star_chips: user.star_chips,
      tier: user.tier,
      days_since: daysSince
    });
  } catch (err) { next(err); }
});

// GET /api/users/me/stars
router.get('/me/stars', authRequired, async (req, res, next) => {
  try {
    const transactions = await StarTransaction.findAll({
      where: { user_id: req.user.id },
      order: [['created_at', 'DESC']],
      limit: 50
    });
    const user = await User.findByPk(req.user.id);
    res.json({ balance: user.star_chips, transactions });
  } catch (err) { next(err); }
});

// POST /api/users/block/:id
router.post('/block/:id', authRequired, async (req, res, next) => {
  try {
    const blocked_id = parseInt(req.params.id);
    if (blocked_id === req.user.id) return res.status(400).json({ error: '자기 자신을 차단할 수 없습니다' });
    await UserBlock.findOrCreate({
      where: { blocker_id: req.user.id, blocked_id },
      defaults: { blocker_id: req.user.id, blocked_id }
    });
    res.json({ success: true });
  } catch (err) { next(err); }
});

// DELETE /api/users/block/:id
router.delete('/block/:id', authRequired, async (req, res, next) => {
  try {
    await UserBlock.destroy({ where: { blocker_id: req.user.id, blocked_id: req.params.id } });
    res.json({ success: true });
  } catch (err) { next(err); }
});

module.exports = router;
