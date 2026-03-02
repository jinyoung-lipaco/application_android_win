const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ProductReview = sequelize.define('ProductReview', {
  product_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 5 },
  body: DataTypes.TEXT
}, { tableName: 'product_reviews', updatedAt: false });

module.exports = ProductReview;
