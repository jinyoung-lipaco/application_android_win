const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const StarTransaction = sequelize.define('StarTransaction', {
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.INTEGER, allowNull: false },
  type: { type: DataTypes.STRING(50), allowNull: false },
  description: DataTypes.STRING(300)
}, { tableName: 'star_transactions', updatedAt: false });

module.exports = StarTransaction;
