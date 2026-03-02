const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ReviewApplication = sequelize.define('ReviewApplication', {
  campaign_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.STRING(20), defaultValue: 'pending' }
}, { tableName: 'review_applications', updatedAt: false });

module.exports = ReviewApplication;
