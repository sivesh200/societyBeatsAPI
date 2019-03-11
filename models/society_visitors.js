'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_visitors = sequelize.define('society_visitors', {
    society_id: DataTypes.INTEGER,
    flat_id: DataTypes.INTEGER,
    flat_info: DataTypes.STRING,
    tower_info: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    full_name: DataTypes.STRING,
    mobile_number: DataTypes.STRING,
    email_id: DataTypes.STRING,
    vehicle_type:DataTypes.INTEGER,
    vehicle_number:DataTypes.STRING,
    place:DataTypes.STRING,
    visit_date:DataTypes.DATE,
    gate_number: DataTypes.STRING,
    in:DataTypes.DATE,
    out:DataTypes.DATE,
    status: DataTypes.INTEGER,
    note: { type: DataTypes.STRING },
    created_by: { type: DataTypes.INTEGER },
    updated_by: { type: DataTypes.INTEGER },
  }, {});
  society_visitors.associate = function(models) {
    // associations can be defined here
  };
  return society_visitors;
};