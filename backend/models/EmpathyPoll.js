const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const EmpathyPoll = sequelize.define('EmpathyPoll', {
  question: { type: DataTypes.TEXT, allowNull: false },
  option_a: { type: DataTypes.STRING(200), allowNull: false },
  option_b: { type: DataTypes.STRING(200), allowNull: false },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { tableName: 'empathy_polls', updatedAt: false });

module.exports = EmpathyPoll;
