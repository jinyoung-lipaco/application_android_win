const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const DailyAnswer = sequelize.define('DailyAnswer', {
  question_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  body: { type: DataTypes.TEXT, allowNull: false },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { tableName: 'daily_answers', updatedAt: false });

module.exports = DailyAnswer;
