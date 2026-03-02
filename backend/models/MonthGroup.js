const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const MonthGroup = sequelize.define('MonthGroup', {
  name: { type: DataTypes.STRING(100), allowNull: false },
  min_months: DataTypes.INTEGER,
  max_months: DataTypes.INTEGER,
  sort_order: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { tableName: 'month_groups', updatedAt: false });

module.exports = MonthGroup;
