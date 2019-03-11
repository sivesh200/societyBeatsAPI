'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('society_advertisings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      society_id: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      brief_desc: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      isPaid: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.FLOAT
      },
      image_url: {
        type: Sequelize.STRING
      },
      link_type: {
        type: Sequelize.STRING
      },
      link_url: {
        type: Sequelize.STRING
      },
      is_publlish_on_dashboard: {
        type: Sequelize.INTEGER
      },
      publish_start_date: {
        type: Sequelize.DATE
      },
      publish_end_date: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('society_advertisings');
  }
};