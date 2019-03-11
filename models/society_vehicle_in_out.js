'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_vehicle_in_out = sequelize.define('society_vehicle_in_out', {
    society_id:DataTypes.INTEGER,
    vehicle_id: DataTypes.INTEGER,
    vehicle_info: DataTypes.STRING,
    gate_number: DataTypes.STRING,   
    status: DataTypes.INTEGER,
    created_by:  DataTypes.INTEGER,
    updated_by:  DataTypes.INTEGER
  }, {});
  society_vehicle_in_out.associate = function(models) {
    // associations can be defined here
  };
  return society_vehicle_in_out;
};