'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_notification = sequelize.define('society_notification', {
    society_id: DataTypes.INTEGER,
    notity_type: {
      type:DataTypes.ENUM('SMS', 'EMAIL','PUSH'),     
    },    
    title: { type: DataTypes.STRING },
    brief_desc: { type: DataTypes.STRING },
    full_desc: { type: DataTypes.STRING },
    status: { type: DataTypes.INTEGER },
    type: { type: DataTypes.STRING },
    read_status: {
      type:DataTypes.ENUM('True', 'False'),     
    },
    attachment:DataTypes.STRING,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
  }, {});
  society_notification.associate = function(models) {
    // associations can be defined here
  };
  return society_notification;
};