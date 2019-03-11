'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_visitors_in_out = sequelize.define('society_visitors_in_out', {
    visitor_id: DataTypes.INTEGER,
    gate_number: DataTypes.STRING,
    in:DataTypes.DATE,
    out:DataTypes.DATE,
    status: DataTypes.INTEGER,
    created_by:  DataTypes.INTEGER,
    updated_by:  DataTypes.INTEGER
  }, {});
  society_visitors_in_out.associate = function(models) {
    // associations can be defined here
  };
  return society_visitors_in_out;
};