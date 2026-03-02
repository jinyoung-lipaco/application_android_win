const router = require('express').Router();
const { VoteCampaign, VoteCriteria, UserVote, ApprovedProduct, IngredientTag, ProductReview, User, ExpertTip } = require('../models');
const { authRequired, authOptional } = require('../middleware/auth');

// GET /api/vote-campaigns
router.get('/', async (req, res, next) => {
  try {
    const { status } = req.query;
    const where = {};
    if (status) where.status = status;
    const campaigns = await VoteCampaign.findAll({
      where,
      include: [{ model: VoteCriteria, attributes: ['id', 'name'] }],
      order: [['created_at', 'DESC']]
    });
    res.json(campaigns);
  } catch (err) { next(err); }
});

// GET /api/vote-campaigns/:id
router.get('/:id', authOptional, async (req, res, next) => {
  try {
    const campaign = await VoteCampaign.findByPk(req.params.id, {
      include: [
        { model: VoteCriteria },
        { model: ApprovedProduct, include: [IngredientTag] }
      ]
    });
    if (!campaign) return res.status(404).json({ error: '캠페인을 찾을 수 없습니다' });

    let myVotes = [];
    if (req.user) {
      myVotes = await UserVote.findAll({ where: { campaign_id: campaign.id, user_id: req.user.id } });
    }
    res.json({ ...campaign.toJSON(), myVotes });
  } catch (err) { next(err); }
});

// POST /api/vote-campaigns/:id/vote
router.post('/:id/vote', authRequired, async (req, res, next) => {
  try {
    const { criteria_id, score } = req.body;
    const [vote, created] = await UserVote.findOrCreate({
      where: { campaign_id: req.params.id, criteria_id, user_id: req.user.id },
      defaults: { campaign_id: req.params.id, criteria_id, user_id: req.user.id, score: score || 1 }
    });
    if (!created) await vote.update({ score: score || 1 });

    if (created) {
      await VoteCampaign.increment('participant_count', { where: { id: req.params.id } });
    }
    res.json({ success: true });
  } catch (err) { next(err); }
});

module.exports = router;
