'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_notices = sequelize.define('society_notices', {
    society_id: DataTypes.INTEGER,
    title: { type: DataTypes.STRING },
    brief_desc: { type: DataTypes.STRING },
    full_desc: { type: DataTypes.STRING },
    status: { type: DataTypes.INTEGER },
    read_status: { type: DataTypes.INTEGER },
    attachment1:DataTypes.STRING,
    attachment2:DataTypes.STRING,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
  }, {});
  society_notices.associate = function(models) {
    // associations can be defined here
  };
  return society_notices;
};