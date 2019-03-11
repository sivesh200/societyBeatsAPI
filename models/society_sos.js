'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_sos = sequelize.define('society_sos', {
    society_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    category_name:DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    title:DataTypes.STRING,
    name:DataTypes.STRING,
    company:DataTypes.STRING,
    mobile:DataTypes.STRING,
    landline:DataTypes.STRING,
    email:DataTypes.STRING,
    fax:DataTypes.STRING,
    address:DataTypes.STRING,
    website:DataTypes.STRING,
    notes:DataTypes.STRING,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {});
  society_sos.associate = function(models) {
    // associations can be defined here
  };
  return society_sos;
};