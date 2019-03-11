'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_flat_mapping = sequelize.define('society_flat_mapping', {
    title: DataTypes.STRING
  }, {});
  society_flat_mapping.associate = function(models) {
    // associations can be defined here
  };
  return society_flat_mapping;
};