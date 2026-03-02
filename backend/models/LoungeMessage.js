const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const LoungeMessage = sequelize.define('LoungeMessage', {
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  month_group_id: DataTypes.INTEGER,
  body: { type: DataTypes.TEXT, allowNull: false }
}, { tableName: 'lounge_messages', updatedAt: false });

module.exports = LoungeMessage;
