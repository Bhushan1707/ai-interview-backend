'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserQuestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Questions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      status: {
        type: Sequelize.ENUM('completed'),
        defaultValue: 'completed'
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

    // Add index for fast lookup
    await queryInterface.addIndex('UserQuestions', ['userId', 'questionId'], {
      unique: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserQuestions');
  }
};
