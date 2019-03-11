'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_complaints_comments = sequelize.define('society_complaints_comments', {
    complaint_id: DataTypes.INTEGER,
    title: { type: DataTypes.STRING },
    brief_desc: { type: DataTypes.STRING },
    full_desc: { type: DataTypes.STRING },
    status: { type: DataTypes.INTEGER },
    attachment1:DataTypes.STRING,
    attachment2:DataTypes.STRING,
    attachment3:DataTypes.STRING,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
  }, {});
  society_complaints_comments.associate = function(models) {
    // associations can be defined here
  };
  return society_complaints_comments;
};