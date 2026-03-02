const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Child = sequelize.define('Child', {
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  name: DataTypes.STRING(50),
  birth_date: { type: DataTypes.DATEONLY, allowNull: false },
  gender: DataTypes.STRING(10)
}, { tableName: 'children' });

module.exports = Child;
