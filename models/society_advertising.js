'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_advertising = sequelize.define('society_advertising', {
    society_id:DataTypes.INTEGER,
    title: DataTypes.STRING,
    brief_desc: DataTypes.STRING,
    status: DataTypes.INTEGER,
    isPaid: DataTypes.INTEGER,
    price: DataTypes.FLOAT,    
    image_url: DataTypes.STRING,
    link_type: DataTypes.STRING,
    link_url: DataTypes.STRING,
    is_publlish_on_dashboard: DataTypes.INTEGER,
    publish_start_date:DataTypes.DATE,
    publish_end_date:DataTypes.DATE
  }, {});
  society_advertising.associate = function(models) {
    // associations can be defined here
  };
  return society_advertising;
};