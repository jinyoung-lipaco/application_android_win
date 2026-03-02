const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING(255), allowNull: false },
  nickname: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  avatar: { type: DataTypes.STRING(20), defaultValue: '🐥' },
  avatar_gradient: { type: DataTypes.STRING(10), defaultValue: 'g1' },
  bio: DataTypes.TEXT,
  tier: { type: DataTypes.STRING(20), defaultValue: '새싹맘' },
  star_chips: { type: DataTypes.INTEGER, defaultValue: 0 },
  member_since: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { tableName: 'users' });

module.exports = User;
