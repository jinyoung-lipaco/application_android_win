const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ExchangeItem = sequelize.define('ExchangeItem', {
  name: { type: DataTypes.STRING(200), allowNull: false },
  emoji: DataTypes.STRING(20),
  bg_gradient: DataTypes.STRING(100),
  star_price: { type: DataTypes.INTEGER, allowNull: false },
  stock: { type: DataTypes.INTEGER, defaultValue: 10 },
  is_limited: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: 'exchange_items' });

module.exports = ExchangeItem;
