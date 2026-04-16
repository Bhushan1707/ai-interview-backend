'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      email: 'candidate@example.com',
      passwordHash: 'dummyHashForNow',
      displayName: 'Candidate',
      xp: 450,
      avatarUrl: '',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'alex@example.com',
      passwordHash: 'dummyHashForNow',
      displayName: 'Alex',
      xp: 120,
      avatarUrl: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
