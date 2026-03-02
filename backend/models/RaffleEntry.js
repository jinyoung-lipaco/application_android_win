const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const RaffleEntry = sequelize.define('RaffleEntry', {
  raffle_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'raffle_entries', updatedAt: false });

module.exports = RaffleEntry;
