const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const GroupMember = sequelize.define('GroupMember', {
  group_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  role: { type: DataTypes.STRING(20), defaultValue: 'member' },
  joined_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'group_members', timestamps: false });

module.exports = GroupMember;
