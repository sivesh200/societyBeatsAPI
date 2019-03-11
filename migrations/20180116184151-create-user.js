'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first: {
        type: Sequelize.STRING
      },
      last: {
        type: Sequelize.STRING
      },
      email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
      },
      phone: {
          type: Sequelize.STRING,
          unique : true,
      },
      phone1: {
        type: Sequelize.STRING,
        unique : true,
    },
    push_id: {type: Sequelize.STRING  },
    blood_group: {type: Sequelize.STRING  },
    gender: {type: Sequelize.STRING  },
    dob: {type: Sequelize.STRING  },
    profesion: {type: Sequelize.STRING  },
    picture: {type: Sequelize.STRING  },
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
    return queryInterface.dropTable('Users');
  }
};