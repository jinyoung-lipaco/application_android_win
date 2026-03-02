const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const CoparentingGroup = sequelize.define('CoparentingGroup', {
  creator_id: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING(200), allowNull: false },
  description: DataTypes.TEXT,
  location: DataTypes.STRING(200),
  schedule: DataTypes.STRING(200),
  max_members: { type: DataTypes.INTEGER, defaultValue: 12 },
  status: { type: DataTypes.STRING(20), defaultValue: 'open' }
}, { tableName: 'coparenting_groups' });

module.exports = CoparentingGroup;
