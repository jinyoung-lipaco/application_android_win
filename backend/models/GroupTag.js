const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const GroupTag = sequelize.define('GroupTag', {
  group_id: { type: DataTypes.INTEGER, allowNull: false },
  tag: { type: DataTypes.STRING(100), allowNull: false }
}, { tableName: 'group_tags', timestamps: false });

module.exports = GroupTag;
