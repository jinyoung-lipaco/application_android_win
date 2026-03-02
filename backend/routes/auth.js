const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { User, Child, NotificationSetting } = require('../models');
const { generateToken, authRequired } = require('../middleware/auth');

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, nickname, avatar, childBirthDate, childName, childGender } = req.body;
    if (!email || !password || !nickname) {
      return res.status(400).json({ error: '이메일, 비밀번호, 닉네임은 필수입니다' });
    }
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ error: '이미 가입된 이메일입니다' });

    const nickExists = await User.findOne({ where: { nickname } });
    if (nickExists) return res.status(409).json({ error: '이미 사용 중인 닉네임입니다' });

    const password_hash = await bcrypt.hash(password, 10);
    const gradients = ['g1', 'g2', 'g3', 'g4'];
    const user = await User.create({
      email, password_hash, nickname,
      avatar: avatar || '🐥',
      avatar_gradient: gradients[Math.floor(Math.random() * 4)],
      star_chips: 100
    });

    if (childBirthDate) {
      await Child.create({
        user_id: user.id,
        name: childName || '',
        birth_date: childBirthDate,
        gender: childGender || ''
      });
    }

    await NotificationSetting.create({ user_id: user.id });

    const token = generateToken(user);
    res.status(201).json({
      token,
      user: { id: user.id, nickname: user.nickname, avatar: user.avatar, avatar_gradient: user.avatar_gradient, tier: user.tier, star_chips: user.star_chips }
    });
  } catch (err) { next(err); }
});

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: '이메일 또는 비밀번호가 잘못되었습니다' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: '이메일 또는 비밀번호가 잘못되었습니다' });

    const token = generateToken(user);
    res.json({
      token,
      user: { id: user.id, nickname: user.nickname, avatar: user.avatar, avatar_gradient: user.avatar_gradient, tier: user.tier, star_chips: user.star_chips }
    });
  } catch (err) { next(err); }
});

// GET /api/auth/me
router.get('/me', authRequired, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password_hash'] },
      include: [Child]
    });
    if (!user) return res.status(404).json({ error: '사용자를 찾을 수 없습니다' });
    res.json(user);
  } catch (err) { next(err); }
});

module.exports = router;
