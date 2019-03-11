'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_booking_service = sequelize.define('society_booking_service', {
    is_paid:DataTypes.INTEGER,
    society_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    booking_date:DataTypes.DATE,
    timeslot_id:DataTypes.INTEGER,
    tabel_id:DataTypes.INTEGER,
    title: DataTypes.STRING,
    brief: DataTypes.STRING,
    full_desc: DataTypes.STRING,
    attachments: DataTypes.STRING,
    status: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {});
  society_booking_service.associate = function(models) {
    // associations can be defined here
  };
  return society_booking_service;
};