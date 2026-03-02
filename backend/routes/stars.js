const router = require('express').Router();
const { User, StarTransaction, RaffleCampaign, RaffleEntry, ExchangeItem } = require('../models');
const { authRequired } = require('../middleware/auth');

// GET /api/stars/balance
router.get('/balance', authRequired, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json({ balance: user.star_chips });
  } catch (err) { next(err); }
});

// GET /api/stars/transactions
router.get('/transactions', authRequired, async (req, res, next) => {
  try {
    const transactions = await StarTransaction.findAll({
      where: { user_id: req.user.id },
      order: [['created_at', 'DESC']],
      limit: 50
    });
    res.json(transactions);
  } catch (err) { next(err); }
});

// POST /api/stars/raffle/:id
router.post('/raffle/:id', authRequired, async (req, res, next) => {
  try {
    const raffle = await RaffleCampaign.findByPk(req.params.id);
    if (!raffle) return res.status(404).json({ error: '래플을 찾을 수 없습니다' });
    if (raffle.status !== 'live') return res.status(400).json({ error: '종료된 래플입니다' });

    const user = await User.findByPk(req.user.id);
    if (user.star_chips < raffle.star_cost) return res.status(400).json({ error: '별조각이 부족합니다' });

    const [entry, created] = await RaffleEntry.findOrCreate({
      where: { raffle_id: raffle.id, user_id: req.user.id },
      defaults: { raffle_id: raffle.id, user_id: req.user.id }
    });
    if (!created) return res.status(400).json({ error: '이미 응모했습니다' });

    await user.decrement('star_chips', { by: raffle.star_cost });
    await StarTransaction.create({ user_id: req.user.id, amount: -raffle.star_cost, type: 'raffle', description: `${raffle.product_name} 래플 응모` });
    await raffle.increment('applicant_count');

    res.json({ success: true, remaining: user.star_chips - raffle.star_cost });
  } catch (err) { next(err); }
});

// POST /api/stars/exchange/:id
router.post('/exchange/:id', authRequired, async (req, res, next) => {
  try {
    const item = await ExchangeItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: '교환 상품을 찾을 수 없습니다' });
    if (item.stock <= 0) return res.status(400).json({ error: '재고가 없습니다' });

    const user = await User.findByPk(req.user.id);
    if (user.star_chips < item.star_price) return res.status(400).json({ error: '별조각이 부족합니다' });

    await user.decrement('star_chips', { by: item.star_price });
    await item.decrement('stock');
    await StarTransaction.create({ user_id: req.user.id, amount: -item.star_price, type: 'exchange', description: `${item.name} 교환` });

    res.json({ success: true, remaining: user.star_chips - item.star_price });
  } catch (err) { next(err); }
});

// GET /api/stars/raffles
router.get('/raffles', async (req, res, next) => {
  try {
    const raffles = await RaffleCampaign.findAll({ order: [['created_at', 'DESC']] });
    res.json(raffles);
  } catch (err) { next(err); }
});

// GET /api/stars/exchange-items
router.get('/exchange-items', async (req, res, next) => {
  try {
    const items = await ExchangeItem.findAll({ order: [['created_at', 'DESC']] });
    res.json(items);
  } catch (err) { next(err); }
});

module.exports = router;
