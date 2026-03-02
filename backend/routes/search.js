const router = require('express').Router();
const { Post, Article, User, ReviewCampaign, ApprovedProduct } = require('../models');
const { Op } = require('sequelize');

// GET /api/search?q=
router.get('/', async (req, res, next) => {
  try {
    const { q, type } = req.query;
    if (!q) return res.json({ posts: [], articles: [], products: [] });

    const like = { [Op.iLike]: `%${q}%` };
    const results = {};

    if (!type || type === 'community') {
      results.posts = await Post.findAll({
        where: { [Op.or]: [{ body: like }, { tags: like }] },
        include: [{ model: User, attributes: ['id', 'nickname', 'avatar', 'avatar_gradient', 'tier'] }],
        order: [['created_at', 'DESC']],
        limit: 10
      });
    }

    if (!type || type === 'info') {
      results.articles = await Article.findAll({
        where: { [Op.or]: [{ title: like }, { body: like }, { tags: like }] },
        order: [['created_at', 'DESC']],
        limit: 10
      });
    }

    if (!type || type === 'market') {
      results.products = await ApprovedProduct.findAll({
        where: { [Op.or]: [{ name: like }, { brand: like }] },
        limit: 10
      });
    }

    res.json(results);
  } catch (err) { next(err); }
});

module.exports = router;
