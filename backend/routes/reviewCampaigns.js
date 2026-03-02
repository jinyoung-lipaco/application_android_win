const router = require('express').Router();
const { ReviewCampaign, ReviewCondition, ReviewApplication, User } = require('../models');
const { authRequired, authOptional } = require('../middleware/auth');

// GET /api/review-campaigns
router.get('/', async (req, res, next) => {
  try {
    const { status } = req.query;
    const where = {};
    if (status) where.status = status;
    const campaigns = await ReviewCampaign.findAll({
      where,
      include: [ReviewCondition],
      order: [['created_at', 'DESC']]
    });
    res.json(campaigns);
  } catch (err) { next(err); }
});

// GET /api/review-campaigns/:id
router.get('/:id', authOptional, async (req, res, next) => {
  try {
    const campaign = await ReviewCampaign.findByPk(req.params.id, {
      include: [ReviewCondition]
    });
    if (!campaign) return res.status(404).json({ error: '리뷰약속을 찾을 수 없습니다' });

    let applied = false;
    if (req.user) {
      const app = await ReviewApplication.findOne({ where: { campaign_id: campaign.id, user_id: req.user.id } });
      applied = !!app;
    }
    res.json({ ...campaign.toJSON(), applied });
  } catch (err) { next(err); }
});

// POST /api/review-campaigns/:id/apply
router.post('/:id/apply', authRequired, async (req, res, next) => {
  try {
    const [application, created] = await ReviewApplication.findOrCreate({
      where: { campaign_id: req.params.id, user_id: req.user.id },
      defaults: { campaign_id: req.params.id, user_id: req.user.id }
    });
    if (!created) return res.status(400).json({ error: '이미 신청했습니다' });

    await ReviewCampaign.increment('applicant_count', { where: { id: req.params.id } });
    res.status(201).json(application);
  } catch (err) { next(err); }
});

module.exports = router;
