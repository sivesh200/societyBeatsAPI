'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_domestic_helper_in_out = sequelize.define('society_domestic_helper_in_out', {
    society_id:DataTypes.INTEGER,
    domestic_helper_id: DataTypes.INTEGER,
    domestic_helper_info: DataTypes.STRING,
    gate_number: DataTypes.STRING,
    status: DataTypes.INTEGER,
    created_by:  DataTypes.INTEGER,
    updated_by:  DataTypes.INTEGER
  }, {});
  society_domestic_helper_in_out.associate = function(models) {
    // associations can be defined here
  };
  return society_domestic_helper_in_out;
};