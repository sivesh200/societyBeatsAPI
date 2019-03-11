'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_vehicles = sequelize.define('society_vehicles', {
    society_id: DataTypes.INTEGER,
    flat_id: DataTypes.INTEGER,
    tower_info: DataTypes.STRING,
    flat_info: DataTypes.STRING,
    number: DataTypes.STRING,
    Type: DataTypes.STRING,
    model: DataTypes.STRING,
    color: DataTypes.STRING,
    status: DataTypes.INTEGER,
    in_out_status: DataTypes.INTEGER,
  }, {});
  society_vehicles.associate = function(models) {
    // associations can be defined here
  };
  return society_vehicles;
};