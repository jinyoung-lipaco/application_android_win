const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Post = sequelize.define('Post', {
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  topic_id: DataTypes.INTEGER,
  month_group_id: DataTypes.INTEGER,
  body: { type: DataTypes.TEXT, allowNull: false },
  tags: DataTypes.STRING(500),
  image_url: DataTypes.STRING(500),
  is_popular: { type: DataTypes.BOOLEAN, defaultValue: false },
  view_count: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { tableName: 'posts' });

module.exports = Post;
