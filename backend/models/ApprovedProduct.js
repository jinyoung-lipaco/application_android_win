const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ApprovedProduct = sequelize.define('ApprovedProduct', {
  campaign_id: DataTypes.INTEGER,
  name: { type: DataTypes.STRING(200), allowNull: false },
  brand: DataTypes.STRING(100),
  price: DataTypes.STRING(50),
  emoji: DataTypes.STRING(20),
  bg_gradient: DataTypes.STRING(100),
  safety_grade: { type: DataTypes.STRING(5), defaultValue: 'A' },
  ewg_grade: DataTypes.STRING(20),
  criteria_met: DataTypes.STRING(50)
}, { tableName: 'approved_products' });

module.exports = ApprovedProduct;
