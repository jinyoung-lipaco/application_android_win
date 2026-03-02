const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const VerificationPhoto = sequelize.define('VerificationPhoto', {
  verification_id: { type: DataTypes.INTEGER, allowNull: false },
  photo_url: { type: DataTypes.STRING(500), allowNull: false }
}, { tableName: 'verification_photos', updatedAt: false });

module.exports = VerificationPhoto;
