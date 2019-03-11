'use strict';
module.exports = (sequelize, DataTypes) => {
  var master_maintanence_services = sequelize.define('master_maintanence_services', {
    title: DataTypes.STRING,
    brief_desc: DataTypes.STRING,
    image_url:DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});
  master_maintanence_services.associate = function(models) {
    // associations can be defined here
  };
  return master_maintanence_services;
};