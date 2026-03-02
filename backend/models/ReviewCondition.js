const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ReviewCondition = sequelize.define('ReviewCondition', {
  campaign_id: { type: DataTypes.INTEGER, allowNull: false },
  condition_text: { type: DataTypes.STRING(500), allowNull: false },
  sort_order: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { tableName: 'review_conditions', timestamps: false });

module.exports = ReviewCondition;
