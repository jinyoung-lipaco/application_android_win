const router = require('express').Router();
const { EmpathyPoll, EmpathyVote, sequelize } = require('../models');
const { authRequired, authOptional } = require('../middleware/auth');

// GET /api/empathy-polls
router.get('/', authOptional, async (req, res, next) => {
  try {
    const polls = await EmpathyPoll.findAll({ where: { is_active: true }, order: [['created_at', 'DESC']] });
    const result = await Promise.all(polls.map(async (poll) => {
      const countA = await EmpathyVote.count({ where: { poll_id: poll.id, choice: 'A' } });
      const countB = await EmpathyVote.count({ where: { poll_id: poll.id, choice: 'B' } });
      let myVote = null;
      if (req.user) {
        const v = await EmpathyVote.findOne({ where: { poll_id: poll.id, user_id: req.user.id } });
        if (v) myVote = v.choice;
      }
      return { ...poll.toJSON(), countA, countB, total: countA + countB, myVote };
    }));
    res.json(result);
  } catch (err) { next(err); }
});

// POST /api/empathy-polls/:id/vote
router.post('/:id/vote', authRequired, async (req, res, next) => {
  try {
    const { choice } = req.body;
    if (!['A', 'B'].includes(choice)) return res.status(400).json({ error: 'A 또는 B를 선택해주세요' });
    const [vote, created] = await EmpathyVote.findOrCreate({
      where: { poll_id: req.params.id, user_id: req.user.id },
      defaults: { poll_id: req.params.id, user_id: req.user.id, choice }
    });
    if (!created) {
      await vote.update({ choice });
    }
    res.json({ success: true, choice });
  } catch (err) { next(err); }
});

module.exports = router;
