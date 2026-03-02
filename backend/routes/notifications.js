const router = require('express').Router();
const { Notification, NotificationSetting } = require('../models');
const { authRequired } = require('../middleware/auth');

// GET /api/notifications
router.get('/', authRequired, async (req, res, next) => {
  try {
    const { type } = req.query;
    const where = { user_id: req.user.id };
    if (type && type !== 'all') where.type = type;

    const notifications = await Notification.findAll({
      where,
      order: [['created_at', 'DESC']],
      limit: 50
    });
    const unreadCount = await Notification.count({ where: { user_id: req.user.id, is_read: false } });
    res.json({ notifications, unreadCount });
  } catch (err) { next(err); }
});

// PUT /api/notifications/read-all
router.put('/read-all', authRequired, async (req, res, next) => {
  try {
    await Notification.update({ is_read: true }, { where: { user_id: req.user.id, is_read: false } });
    res.json({ success: true });
  } catch (err) { next(err); }
});

// PUT /api/notifications/:id/read
router.put('/:id/read', authRequired, async (req, res, next) => {
  try {
    await Notification.update({ is_read: true }, { where: { id: req.params.id, user_id: req.user.id } });
    res.json({ success: true });
  } catch (err) { next(err); }
});

// GET /api/notifications/settings
router.get('/settings', authRequired, async (req, res, next) => {
  try {
    const [settings] = await NotificationSetting.findOrCreate({
      where: { user_id: req.user.id },
      defaults: { user_id: req.user.id }
    });
    res.json(settings);
  } catch (err) { next(err); }
});

// PUT /api/notifications/settings
router.put('/settings', authRequired, async (req, res, next) => {
  try {
    const [settings] = await NotificationSetting.findOrCreate({
      where: { user_id: req.user.id },
      defaults: { user_id: req.user.id }
    });
    await settings.update(req.body);
    res.json(settings);
  } catch (err) { next(err); }
});

module.exports = router;
