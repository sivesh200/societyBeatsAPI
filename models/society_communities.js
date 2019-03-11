'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_communities = sequelize.define('society_communities', {
    society_id: DataTypes.INTEGER,
    title: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    brief_desc: { type: DataTypes.STRING },
    full_desc: { type: DataTypes.STRING },
    total_members: { type: DataTypes.INTEGER },
    isJoin:{
      type:DataTypes.ENUM('True', 'False'),     
    },
    status: { type: DataTypes.INTEGER },
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
  }, {});
  society_communities.associate = function(models) {
    // associations can be defined here
  };
  return society_communities;
};