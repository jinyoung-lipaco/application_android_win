const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Comment = sequelize.define('Comment', {
  post_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  parent_id: DataTypes.INTEGER,
  body: { type: DataTypes.TEXT, allowNull: false }
}, { tableName: 'comments' });

module.exports = Comment;
