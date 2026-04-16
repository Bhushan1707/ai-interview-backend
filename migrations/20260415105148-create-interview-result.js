'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InterviewResults', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sessionId: {
        type: Sequelize.INTEGER
      },
      questionId: {
        type: Sequelize.INTEGER
      },
      userAnswer: {
        type: Sequelize.TEXT
      },
      grade: {
        type: Sequelize.STRING
      },
      pointsEarned: {
        type: Sequelize.INTEGER
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('InterviewResults');
  }
};