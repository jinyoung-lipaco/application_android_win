const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const MeetupVerification = sequelize.define('MeetupVerification', {
  group_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  meeting_date: { type: DataTypes.DATEONLY, allowNull: false },
  place: DataTypes.STRING(200),
  member_count: DataTypes.INTEGER,
  content: DataTypes.TEXT
}, { tableName: 'meetup_verifications', updatedAt: false });

module.exports = MeetupVerification;
