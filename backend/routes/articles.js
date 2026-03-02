const router = require('express').Router();
const { Article } = require('../models');
const { Op } = require('sequelize');

// GET /api/articles
router.get('/', async (req, res, next) => {
  try {
    const { category, page = 1, limit = 20 } = req.query;
    const where = {};
    if (category && category !== 'all') where.category = category;

    const { rows, count } = await Article.findAndCountAll({
      where,
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: (page - 1) * limit
    });
    res.json({ articles: rows, total: count });
  } catch (err) { next(err); }
});

// GET /api/articles/:id
router.get('/:id', async (req, res, next) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ error: '정보를 찾을 수 없습니다' });
    await article.increment('view_count');
    res.json(article);
  } catch (err) { next(err); }
});

module.exports = router;
