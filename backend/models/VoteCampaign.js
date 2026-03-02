const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const VoteCampaign = sequelize.define('VoteCampaign', {
  title: { type: DataTypes.STRING(200), allowNull: false },
  description: DataTypes.TEXT,
  icon: DataTypes.STRING(20),
  bg_gradient: DataTypes.STRING(100),
  status: { type: DataTypes.STRING(20), defaultValue: 'live' },
  participant_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  criteria_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  days_remaining: { type: DataTypes.INTEGER, defaultValue: 30 }
}, { tableName: 'vote_campaigns' });

module.exports = VoteCampaign;
