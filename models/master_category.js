'use strict';
module.exports = (sequelize, DataTypes) => {
  var master_category = sequelize.define('master_category', {
    title: { type: DataTypes.STRING },
    brief_desc: { type: DataTypes.STRING },
    full_desc: { type: DataTypes.STRING },
    status: { type: DataTypes.INTEGER }
  }, {underscored: true});
  master_category.associate = function(models) {
    // associations can be defined here
    master_category.hasMany(models.society_structure_mapping,{
      foreignkey:"master_category_id"
    })
  };
  return master_category;
};