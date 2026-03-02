const router = require('express').Router();
const { DailyQuestion, DailyAnswer, User } = require('../models');
const { authRequired, authOptional } = require('../middleware/auth');

// GET /api/daily-questions/today
router.get('/today', authOptional, async (req, res, next) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const question = await DailyQuestion.findOne({ where: { active_date: today } });
    if (!question) return res.json(null);

    const answers = await DailyAnswer.findAll({
      where: { question_id: question.id },
      include: [{ model: User, attributes: ['id', 'nickname', 'avatar', 'avatar_gradient', 'tier'] }],
      order: [['likes', 'DESC'], ['created_at', 'ASC']],
      limit: 20
    });
    const count = await DailyAnswer.count({ where: { question_id: question.id } });
    res.json({ ...question.toJSON(), answers, answerCount: count });
  } catch (err) { next(err); }
});

// POST /api/daily-questions/:id/answer
router.post('/:id/answer', authRequired, async (req, res, next) => {
  try {
    const { body } = req.body;
    const [answer, created] = await DailyAnswer.findOrCreate({
      where: { question_id: req.params.id, user_id: req.user.id },
      defaults: { question_id: req.params.id, user_id: req.user.id, body }
    });
    if (!created) await answer.update({ body });
    res.json(answer);
  } catch (err) { next(err); }
});

module.exports = router;
