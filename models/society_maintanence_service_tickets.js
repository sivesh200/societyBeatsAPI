'use strict';
module.exports = (sequelize, DataTypes) => {
  var society_maintanence_service_tickets = sequelize.define('society_maintanence_service_tickets', {
    request_id: DataTypes.STRING,
    society_id: DataTypes.INTEGER,
    flat_token_no: DataTypes.STRING,
    flat_info: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    category_info: DataTypes.STRING,
    booking_date:DataTypes.DATE,
    timeslot_id:DataTypes.INTEGER,
    timeslot_info: DataTypes.STRING,
    title: DataTypes.STRING,
    brief: DataTypes.STRING,
    full_desc: DataTypes.STRING,
    attachments: DataTypes.STRING,
    status: DataTypes.INTEGER,
    assign_status: DataTypes.INTEGER,
    assigned_user: DataTypes.INTEGER,
    assigned_user_details:DataTypes.STRING,
    esclated_status: DataTypes.INTEGER,
    reached_status: DataTypes.INTEGER,
    reached_date:DataTypes.DATE,
    reject_reason:DataTypes.STRING, 
    ratting:DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    created_by_info: DataTypes.STRING,
    updated_by: DataTypes.INTEGER
  }, {});
  society_maintanence_service_tickets.associate = function(models) {
    // associations can be defined here   
  };
  return society_maintanence_service_tickets;
};