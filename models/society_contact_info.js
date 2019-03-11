'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_contact_info = sequelize.define('society_contact_info', {
    contact_person_name: {
      type:DataTypes.STRING,     
    },
    contact_person_contact_no: {
      type:DataTypes.STRING,     
    },
    contact_person_name1: {
      type:DataTypes.STRING,     
    },
    contact_person_contact_no1: {
      type:DataTypes.STRING,     
    },
    email1: {
      type:DataTypes.STRING,     
    },
    is_email1_verified: {
      type:DataTypes.ENUM('True', 'False'),      
    },
    email2: {
      type:DataTypes.STRING,     
    },
    phone1: {
      type:DataTypes.STRING,     
    },
    is_phone1_verified: {
      type:DataTypes.ENUM('True', 'False'),     
    },
    phone2: {
      type:DataTypes.STRING,     
    },
    fax1: {
      type:DataTypes.STRING,     
    },
    fax2: {
      type:DataTypes.STRING,     
    },
    address: {
      type:DataTypes.STRING,     
    },
    city: {
      type:DataTypes.STRING,     
    },
    district: {
      type:DataTypes.STRING,     
    },
    state: {
      type:DataTypes.STRING,     
    },
    country: {
      type:DataTypes.STRING,     
    },
    zipcode: {
      type:DataTypes.STRING,     
    },
    landmark: {
      type:DataTypes.STRING,     
    },
    website_url: {
      type:DataTypes.STRING,     
    },
    blog_url: {
      type:DataTypes.STRING,     
    },
    facebook_url: {
      type:DataTypes.STRING,     
    },
    youtube_url: {
      type:DataTypes.STRING,     
    },
    google_plus_url: {
      type:DataTypes.STRING,     
    },
    other_url: {
      type:DataTypes.STRING,     
    },
  }, {underscored: true});

  society_contact_info.associate = function(models) {    
  };
  return society_contact_info;
};