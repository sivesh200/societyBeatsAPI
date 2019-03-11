'use strict';
module.exports = (sequelize, DataTypes) => {
  var users_family_details = sequelize.define('users_family_details', {
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    mobile_number: DataTypes.STRING,
    email_id: DataTypes.STRING,
    invite_status: DataTypes.INTEGER
  }, {});
  users_family_details.associate = function(models) {
    // associations can be defined here
  };
  return users_family_details;
};