const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UserVote = sequelize.define('UserVote', {
  campaign_id: { type: DataTypes.INTEGER, allowNull: false },
  criteria_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  score: { type: DataTypes.INTEGER, defaultValue: 1 }
}, { tableName: 'user_votes', updatedAt: false });

module.exports = UserVote;
