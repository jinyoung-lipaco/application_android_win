const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const IngredientTag = sequelize.define('IngredientTag', {
  product_id: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(100), allowNull: false },
  is_safe: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { tableName: 'ingredient_tags', timestamps: false });

module.exports = IngredientTag;
