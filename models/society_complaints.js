'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_complaints = sequelize.define('society_complaints', {
    society_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
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
  society_complaints.associate = function(models) {
    // associations can be defined here
  };
  return society_complaints;
};