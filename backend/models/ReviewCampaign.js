const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ReviewCampaign = sequelize.define('ReviewCampaign', {
  brand: DataTypes.STRING(100),
  product_name: { type: DataTypes.STRING(200), allowNull: false },
  emoji: DataTypes.STRING(20),
  bg_gradient: DataTypes.STRING(100),
  period: DataTypes.STRING(100),
  slots: { type: DataTypes.INTEGER, defaultValue: 5 },
  star_reward: { type: DataTypes.INTEGER, defaultValue: 10 },
  review_dest: DataTypes.STRING(100),
  info: DataTypes.TEXT,
  status: { type: DataTypes.STRING(20), defaultValue: 'live' },
  applicant_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  ends_at: DataTypes.DATE
}, { tableName: 'review_campaigns' });

module.exports = ReviewCampaign;
