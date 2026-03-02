const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const VoteCriteria = sequelize.define('VoteCriteria', {
  campaign_id: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(200), allowNull: false },
  description: DataTypes.TEXT,
  sort_order: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { tableName: 'vote_criteria', updatedAt: false });

module.exports = VoteCriteria;
