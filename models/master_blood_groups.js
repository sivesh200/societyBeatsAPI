'use strict';
module.exports = (sequelize, DataTypes) => {
  var master_blood_groups = sequelize.define('master_blood_groups', {
    title: { type: DataTypes.STRING },
    brief_desc: { type: DataTypes.STRING },
    full_desc: { type: DataTypes.STRING },
    total_user: { type: DataTypes.INTEGER },
    status: { type: DataTypes.INTEGER },
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
  }, {});
  master_blood_groups.associate = function(models) {
    // associations can be defined here
  };
  return master_blood_groups;
};