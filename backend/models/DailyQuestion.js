const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const DailyQuestion = sequelize.define('DailyQuestion', {
  question: { type: DataTypes.TEXT, allowNull: false },
  active_date: { type: DataTypes.DATEONLY, unique: true }
}, { tableName: 'daily_questions', updatedAt: false });

module.exports = DailyQuestion;
