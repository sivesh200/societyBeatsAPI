'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('society_maintanence_service_tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      booking_date: {
        type: Sequelize.DATE
      },
      timeslot_id: {
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      brief: {
        type: Sequelize.STRING
      },
      full_desc: {
        type: Sequelize.STRING
      },
      attachments: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },      
      assign_status: {
        type: Sequelize.INTEGER
      },
      assigned_user: {
        type: Sequelize.INTEGER
      },
      assigned_user_details: {
        type: Sequelize.STRING
      },
      esclated_status: {
        type: Sequelize.INTEGER
      },
      reached_status: {
        type: Sequelize.INTEGER
      },
      reject_reason: {
        type: Sequelize.STRING
      },
      created_by: {
        type: Sequelize.INTEGER
      },
      updated_by: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('society_maintanence_service_tickets');
  }
};