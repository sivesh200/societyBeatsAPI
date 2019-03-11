'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_structure_mapping = sequelize.define('society_structure_mapping',   {
    parent_id: { type: DataTypes.INTEGER },
    title: { type: DataTypes.STRING },
    brief_desc: { type: DataTypes.STRING },
    full_desc: { type: DataTypes.STRING },
    status: { type: DataTypes.INTEGER }
  }, {underscored: true});
  society_structure_mapping.associate = function(models) {
    // associations can be defined here
  };
  return society_structure_mapping;
};