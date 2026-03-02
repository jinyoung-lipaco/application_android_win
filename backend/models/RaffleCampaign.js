const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const RaffleCampaign = sequelize.define('RaffleCampaign', {
  brand: DataTypes.STRING(100),
  product_name: { type: DataTypes.STRING(200), allowNull: false },
  emoji: DataTypes.STRING(20),
  bg_gradient: DataTypes.STRING(100),
  period: DataTypes.STRING(100),
  announce_date: DataTypes.STRING(100),
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  star_cost: { type: DataTypes.INTEGER, defaultValue: 50 },
  status: { type: DataTypes.STRING(20), defaultValue: 'live' },
  applicant_count: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { tableName: 'raffle_campaigns' });

module.exports = RaffleCampaign;
