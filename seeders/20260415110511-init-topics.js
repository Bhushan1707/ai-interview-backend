'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const topics = [
      { id: 1, name: 'JavaScript', identifier: 'js', description: 'Variables, closures, async, scopes', createdAt: now, updatedAt: now },
      { id: 2, name: 'React.js', identifier: 'react', description: 'Components, hooks, virtual DOM', createdAt: now, updatedAt: now },
      { id: 3, name: 'Node.js', identifier: 'node', description: 'Event loop, streams, express', createdAt: now, updatedAt: now },
      { id: 4, name: 'System Design', identifier: 'system', description: 'Architecture, scalable backend patterns', createdAt: now, updatedAt: now },
      { id: 5, name: 'DSA', identifier: 'dsa', description: 'Arrays, Trees, Graphs, DP', createdAt: now, updatedAt: now }
    ];

    await queryInterface.bulkInsert('Topics', topics, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Topics', null, {});
  }
};