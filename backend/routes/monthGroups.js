const router = require('express').Router();
const { MonthGroup } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const groups = await MonthGroup.findAll({ order: [['sort_order', 'ASC']] });
    res.json(groups);
  } catch (err) { next(err); }
});

module.exports = router;
