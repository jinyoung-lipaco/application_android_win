const router = require('express').Router();
const { ApprovedProduct, IngredientTag, ProductReview, User, VoteCampaign, ExpertTip } = require('../models');
const { authRequired } = require('../middleware/auth');

// GET /api/approved-products
router.get('/', async (req, res, next) => {
  try {
    const { campaign_id } = req.query;
    const where = {};
    if (campaign_id) where.campaign_id = campaign_id;
    const products = await ApprovedProduct.findAll({
      where,
      include: [IngredientTag, { model: VoteCampaign, attributes: ['id', 'title'] }]
    });
    res.json(products);
  } catch (err) { next(err); }
});

// GET /api/approved-products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await ApprovedProduct.findByPk(req.params.id, {
      include: [
        IngredientTag,
        { model: ProductReview, include: [{ model: User, attributes: ['id', 'nickname', 'avatar', 'avatar_gradient', 'tier'] }] },
        { model: VoteCampaign }
      ]
    });
    if (!product) return res.status(404).json({ error: '제품을 찾을 수 없습니다' });
    res.json(product);
  } catch (err) { next(err); }
});

// POST /api/approved-products/:id/reviews
router.post('/:id/reviews', authRequired, async (req, res, next) => {
  try {
    const { rating, body } = req.body;
    const review = await ProductReview.create({
      product_id: req.params.id, user_id: req.user.id, rating, body
    });
    res.status(201).json(review);
  } catch (err) { next(err); }
});

module.exports = router;
