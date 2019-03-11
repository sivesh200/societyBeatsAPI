'use strict';
module.exports = (sequelize, DataTypes) => {
  var users_domestic_helper = sequelize.define('users_domestic_helper', {
    society_id: DataTypes.INTEGER,
    flat_id: DataTypes.INTEGER,
    domestic_helper_id: DataTypes.INTEGER,
    domestic_helper_info:DataTypes.STRING,
    status: { type: DataTypes.INTEGER },
    created_by: { type: DataTypes.INTEGER },
    updated_by: { type: DataTypes.INTEGER },
  }, {});
  users_domestic_helper.associate = function(models) {
    // associations can be defined here
  };
  return users_domestic_helper;
};