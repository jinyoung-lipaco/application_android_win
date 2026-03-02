const router = require('express').Router();
const { Child } = require('../models');
const { authRequired } = require('../middleware/auth');

// GET /api/children
router.get('/', authRequired, async (req, res, next) => {
  try {
    const children = await Child.findAll({ where: { user_id: req.user.id } });
    res.json(children);
  } catch (err) { next(err); }
});

// POST /api/children
router.post('/', authRequired, async (req, res, next) => {
  try {
    const { name, birth_date, gender } = req.body;
    const child = await Child.create({ user_id: req.user.id, name, birth_date, gender });
    res.status(201).json(child);
  } catch (err) { next(err); }
});

// PUT /api/children/:id
router.put('/:id', authRequired, async (req, res, next) => {
  try {
    const child = await Child.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    if (!child) return res.status(404).json({ error: '자녀 정보를 찾을 수 없습니다' });
    await child.update(req.body);
    res.json(child);
  } catch (err) { next(err); }
});

// DELETE /api/children/:id
router.delete('/:id', authRequired, async (req, res, next) => {
  try {
    await Child.destroy({ where: { id: req.params.id, user_id: req.user.id } });
    res.json({ success: true });
  } catch (err) { next(err); }
});

module.exports = router;
