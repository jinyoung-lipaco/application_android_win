const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Reaction = sequelize.define('Reaction', {
  post_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  type: { type: DataTypes.STRING(20), allowNull: false }
}, { tableName: 'reactions', updatedAt: false });

module.exports = Reaction;
