'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('GroupInvites', 'type', {
      type: Sequelize.ENUM('invite', 'request'),
      allowNull: false,
      defaultValue: 'invite'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('GroupInvites', 'type');
    // Note: To completely remove ENUM type in some dialects (like Postgres), additional steps might be needed,
    // but for MySQL/SQLite removeColumn is usually sufficient for the column itself.
  }
};
