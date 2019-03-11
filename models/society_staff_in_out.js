'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_staff_in_out = sequelize.define('society_staff_in_out', {
    society_id: DataTypes.INTEGER,
    staff_id: DataTypes.INTEGER,
    staff_info: DataTypes.STRING,
    gate_number: DataTypes.STRING,
    status: DataTypes.INTEGER,
    created_by:  DataTypes.INTEGER,
    updated_by:  DataTypes.INTEGER
  }, {});
  society_staff_in_out.associate = function(models) {
    // associations can be defined here
  };
  return society_staff_in_out;
};