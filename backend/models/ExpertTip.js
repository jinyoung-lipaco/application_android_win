const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ExpertTip = sequelize.define('ExpertTip', {
  product_id: DataTypes.INTEGER,
  campaign_id: DataTypes.INTEGER,
  expert_name: DataTypes.STRING(100),
  tip_text: { type: DataTypes.TEXT, allowNull: false }
}, { tableName: 'expert_tips', updatedAt: false });

module.exports = ExpertTip;
