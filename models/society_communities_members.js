'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_communities_members = sequelize.define('society_communities_members', {
    communitie_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    user_details: DataTypes.STRING,
    status: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
  }, {});
  society_communities_members.associate = function(models) {
    // associations can be defined here
  };
  return society_communities_members;
};