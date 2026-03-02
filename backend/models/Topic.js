const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Topic = sequelize.define('Topic', {
  name: { type: DataTypes.STRING(100), allowNull: false },
  icon: DataTypes.STRING(20),
  sort_order: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { tableName: 'topics', updatedAt: false });

module.exports = Topic;
