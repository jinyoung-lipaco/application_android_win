const router = require('express').Router();
const { Topic } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const topics = await Topic.findAll({ order: [['sort_order', 'ASC']] });
    res.json(topics);
  } catch (err) { next(err); }
});

module.exports = router;
