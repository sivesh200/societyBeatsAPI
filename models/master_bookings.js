'use strict';
module.exports = (sequelize, DataTypes) => {
  var master_bookings = sequelize.define('master_bookings', {
    title: DataTypes.STRING,
    brief_desc: DataTypes.STRING,
    image_url:DataTypes.STRING,
    status: DataTypes.INTEGER,
    isPaid: {
      type:DataTypes.ENUM('True', 'False'),     
    }
  }, {});
  master_bookings.associate = function(models) {
    // associations can be defined here
  };
  return master_bookings;
};