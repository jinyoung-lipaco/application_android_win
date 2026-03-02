const router = require('express').Router();
const { LoungeMessage, User, MonthGroup } = require('../models');
const { authRequired } = require('../middleware/auth');

// GET /api/lounge/:monthGroupId
router.get('/:monthGroupId', async (req, res, next) => {
  try {
    const messages = await LoungeMessage.findAll({
      where: { month_group_id: req.params.monthGroupId },
      include: [{ model: User, attributes: ['id', 'nickname', 'avatar', 'avatar_gradient', 'tier'] }],
      order: [['created_at', 'DESC']],
      limit: 50
    });
    res.json(messages.reverse());
  } catch (err) { next(err); }
});

// POST /api/lounge/:monthGroupId
router.post('/:monthGroupId', authRequired, async (req, res, next) => {
  try {
    const { body } = req.body;
    const message = await LoungeMessage.create({
      user_id: req.user.id,
      month_group_id: req.params.monthGroupId,
      body
    });
    const full = await LoungeMessage.findByPk(message.id, {
      include: [{ model: User, attributes: ['id', 'nickname', 'avatar', 'avatar_gradient', 'tier'] }]
    });
    res.status(201).json(full);
  } catch (err) { next(err); }
});

module.exports = router;
