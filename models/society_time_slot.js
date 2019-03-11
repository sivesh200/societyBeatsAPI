'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_time_slot = sequelize.define('society_time_slot', {
    society_id: DataTypes.INTEGER,  
    category_id: DataTypes.INTEGER,
    day_id: DataTypes.INTEGER,
    time: { type: DataTypes.STRING },
    brief_desc: { type: DataTypes.STRING },
    full_desc: { type: DataTypes.STRING },
    status: { type: DataTypes.INTEGER }
  }, {});
  society_time_slot.associate = function(models) {
    // associations can be defined here
  };
  return society_time_slot;
};