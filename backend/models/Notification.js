const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Notification = sequelize.define('Notification', {
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  type: { type: DataTypes.STRING(50), allowNull: false },
  title: { type: DataTypes.STRING(300), allowNull: false },
  body: DataTypes.TEXT,
  is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
  data: DataTypes.JSONB
}, { tableName: 'notifications', updatedAt: false });

module.exports = Notification;
