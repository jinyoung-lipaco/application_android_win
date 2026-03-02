const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const EmpathyVote = sequelize.define('EmpathyVote', {
  poll_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  choice: { type: DataTypes.STRING(1), allowNull: false }
}, { tableName: 'empathy_votes', updatedAt: false });

module.exports = EmpathyVote;
