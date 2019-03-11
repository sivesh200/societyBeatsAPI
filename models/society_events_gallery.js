'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_events_gallery = sequelize.define('society_events_gallery', {
    event_id: DataTypes.INTEGER,
    title: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    brief_desc: { type: DataTypes.STRING },
    full_desc: { type: DataTypes.STRING },
    location: { type: DataTypes.STRING },
    date:{type: DataTypes.DATE},
    likes: { type: DataTypes.INTEGER },
    notes: { type: DataTypes.STRING },
    status: { type: DataTypes.INTEGER },
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
  }, {});
  society_events_gallery.associate = function(models) {
    // associations can be defined here
  };
  return society_events_gallery;
};