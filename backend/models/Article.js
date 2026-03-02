const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Article = sequelize.define('Article', {
  title: { type: DataTypes.STRING(300), allowNull: false },
  body: { type: DataTypes.TEXT, allowNull: false },
  category: { type: DataTypes.STRING(50), allowNull: false },
  tags: DataTypes.STRING(500),
  thumbnail_url: DataTypes.STRING(500),
  view_count: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { tableName: 'articles' });

module.exports = Article;
