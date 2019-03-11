'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_sos_category = sequelize.define('society_sos_category', {    
    title: { type: DataTypes.STRING },
    brief_desc: { type: DataTypes.STRING },
    full_desc: { type: DataTypes.STRING },
    status: { type: DataTypes.INTEGER }
  }, {});
  society_sos_category.associate = function(models) {
    // associations can be defined here
  };
  return society_sos_category;
};