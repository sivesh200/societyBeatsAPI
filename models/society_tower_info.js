'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_tower_info = sequelize.define('society_tower_info', {
    society_id: DataTypes.INTEGER,
    society_zone_id:DataTypes.INTEGER,
    title: DataTypes.STRING,
    brief_details: DataTypes.STRING,
    no_of_flats: DataTypes.INTEGER,
    no_of_floors: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {});
  society_tower_info.associate = function(models) {
    // associations can be defined here
  };
  return society_tower_info;
};