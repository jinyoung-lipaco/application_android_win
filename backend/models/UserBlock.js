const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UserBlock = sequelize.define('UserBlock', {
  blocker_id: { type: DataTypes.INTEGER, allowNull: false },
  blocked_id: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'user_blocks', updatedAt: false });

module.exports = UserBlock;
