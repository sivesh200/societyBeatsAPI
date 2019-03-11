'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_flat_info = sequelize.define('society_flat_info', {   
    flat_token_no: DataTypes.STRING,
    flat_address:DataTypes.STRING,
    society_id:DataTypes.INTEGER,
    tower_id:DataTypes.INTEGER,
    floor_no:DataTypes.INTEGER,
    sqft:DataTypes.INTEGER,
    name: DataTypes.STRING,
    mobile_number: DataTypes.STRING,
    emergency_mobile_number:DataTypes.STRING,
    email_id: DataTypes.STRING,
    status: DataTypes.INTEGER,
    flat_position_date:DataTypes.DATE
  }, {});
  society_flat_info.associate = function(models) {
    // associations can be defined here
  };
  return society_flat_info;
};