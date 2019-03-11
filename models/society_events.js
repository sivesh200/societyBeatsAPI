'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_events = sequelize.define('society_events', {
    society_id: DataTypes.INTEGER,
    title: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    brief_desc: { type: DataTypes.STRING },
    full_desc: { type: DataTypes.STRING },
    total_images: { type: DataTypes.INTEGER },
    status: { type: DataTypes.INTEGER },
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
  }, {});
  society_events.associate = function(models) {
    // associations can be defined here
  };
  return society_events;
};