const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const NotificationSetting = sequelize.define('NotificationSetting', {
  user_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  community: { type: DataTypes.BOOLEAN, defaultValue: true },
  votes: { type: DataTypes.BOOLEAN, defaultValue: true },
  reviews: { type: DataTypes.BOOLEAN, defaultValue: true },
  groups: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { tableName: 'notification_settings' });

module.exports = NotificationSetting;
