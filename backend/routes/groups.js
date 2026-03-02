const router = require('express').Router();
const { CoparentingGroup, GroupTag, GroupMember, MeetupVerification, VerificationPhoto, User } = require('../models');
const { authRequired, authOptional } = require('../middleware/auth');
const upload = require('../middleware/upload');

// GET /api/groups
router.get('/', authOptional, async (req, res, next) => {
  try {
    const groups = await CoparentingGroup.findAll({
      include: [
        { model: GroupTag, attributes: ['tag'] },
        { model: GroupMember, attributes: ['user_id', 'role'], include: [{ model: User, attributes: ['avatar'] }] },
        { model: User, as: 'creator', attributes: ['id', 'nickname'] }
      ],
      order: [['created_at', 'DESC']]
    });
    const result = groups.map(g => {
      const json = g.toJSON();
      json.memberCount = json.GroupMembers.length;
      let myRole = null;
      if (req.user) {
        const me = json.GroupMembers.find(m => m.user_id === req.user.id);
        if (me) myRole = me.role;
      }
      json.myRole = myRole;
      return json;
    });
    res.json(result);
  } catch (err) { next(err); }
});

// GET /api/groups/:id
router.get('/:id', authOptional, async (req, res, next) => {
  try {
    const group = await CoparentingGroup.findByPk(req.params.id, {
      include: [
        { model: GroupTag }, { model: GroupMember, include: [{ model: User, attributes: ['id', 'nickname', 'avatar', 'avatar_gradient'] }] },
        { model: User, as: 'creator', attributes: ['id', 'nickname', 'avatar'] }
      ]
    });
    if (!group) return res.status(404).json({ error: '모임을 찾을 수 없습니다' });
    res.json(group);
  } catch (err) { next(err); }
});

// POST /api/groups
router.post('/', authRequired, async (req, res, next) => {
  try {
    const { title, description, location, schedule, max_members, tags } = req.body;
    const group = await CoparentingGroup.create({ creator_id: req.user.id, title, description, location, schedule, max_members });
    await GroupMember.create({ group_id: group.id, user_id: req.user.id, role: 'leader' });
    if (tags && tags.length) {
      await GroupTag.bulkCreate(tags.map(tag => ({ group_id: group.id, tag })));
    }
    res.status(201).json(group);
  } catch (err) { next(err); }
});

// POST /api/groups/:id/join
router.post('/:id/join', authRequired, async (req, res, next) => {
  try {
    const group = await CoparentingGroup.findByPk(req.params.id);
    if (!group) return res.status(404).json({ error: '모임을 찾을 수 없습니다' });
    const memberCount = await GroupMember.count({ where: { group_id: group.id } });
    if (memberCount >= group.max_members) return res.status(400).json({ error: '모임이 가득 찼습니다' });

    const [member, created] = await GroupMember.findOrCreate({
      where: { group_id: group.id, user_id: req.user.id },
      defaults: { group_id: group.id, user_id: req.user.id }
    });
    if (!created) return res.status(400).json({ error: '이미 참여 중입니다' });

    if (memberCount + 1 >= group.max_members) {
      await group.update({ status: 'full' });
    }
    res.json({ success: true });
  } catch (err) { next(err); }
});

// POST /api/groups/:id/verify
router.post('/:id/verify', authRequired, upload.array('photos', 5), async (req, res, next) => {
  try {
    const { meeting_date, place, member_count, content } = req.body;
    const verification = await MeetupVerification.create({
      group_id: req.params.id, user_id: req.user.id, meeting_date, place, member_count, content
    });
    if (req.files && req.files.length) {
      await VerificationPhoto.bulkCreate(
        req.files.map(f => ({ verification_id: verification.id, photo_url: `/uploads/${f.filename}` }))
      );
    }
    res.status(201).json(verification);
  } catch (err) { next(err); }
});

module.exports = router;
