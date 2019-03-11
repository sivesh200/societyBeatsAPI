'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_staff = sequelize.define('society_staff', {
    public_id: DataTypes.STRING,
    society_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    category_info: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    gender: {
      type:DataTypes.ENUM('Male', 'Female'),     
    },
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    image: DataTypes.STRING,
    alternate_phone: DataTypes.STRING,
    permanent_address: DataTypes.STRING,
    present_address: DataTypes.STRING,
    kyc_document1: DataTypes.STRING,
    kyc_document2: DataTypes.STRING,
    fingerprint_data: DataTypes.STRING,
    referral_info: DataTypes.STRING,
    status: DataTypes.INTEGER,
    in_out_status: DataTypes.INTEGER,
    total_ticket:DataTypes.INTEGER,
    ticket_list: DataTypes.STRING,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
    notes: DataTypes.STRING,
  }, {});
  society_staff.associate = function(models) {
    // associations can be defined here
  };
  return society_staff;
};