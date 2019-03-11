'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_bookings = sequelize.define('society_bookings', {
    society_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {});
  society_bookings.associate = function(models) {
    // associations can be defined here
  };
  return society_bookings;
};