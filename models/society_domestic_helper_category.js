'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_domestic_helper_category = sequelize.define('society_domestic_helper_category', {
    society_id: DataTypes.INTEGER,
    title: { type: DataTypes.STRING },
    brief_desc: { type: DataTypes.STRING },
    full_desc: { type: DataTypes.STRING },
    status: { type: DataTypes.INTEGER },
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {});
  society_domestic_helper_category.associate = function(models) {
    // associations can be defined here
  };
  return society_domestic_helper_category;
};