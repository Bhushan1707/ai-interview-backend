'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('GroupInvites', 'status', {
      type: Sequelize.ENUM('pending', 'accepted', 'rejected'),
      allowNull: false,
      defaultValue: 'pending'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('GroupInvites', 'status', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
