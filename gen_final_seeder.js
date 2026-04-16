const fs = require('fs');
const path = require('path');

const jsQuestions = require('./temp_qs.js');

const questions = [];

// Populate from extracted arrays
const processJs = (arr, diff) => {
  if (arr) {
    arr.forEach(q => {
      questions.push({
        topicId: 1, // JS
        difficulty: diff,
        questionText: q.question,
        referenceAnswer: q.answer
      });
    });
  }
};

processJs(jsQuestions.jsBasic, 'basic');
processJs(jsQuestions.jsMedium, 'medium');
processJs(jsQuestions.jsAdvanced, 'advanced');

// Populate 100 for other topics
const generateMock = (topicId, topicName, basicCount, medCount, advCount) => {
  const addLevel = (count, diff) => {
    for (let i = 1; i <= count; i++) {
        questions.push({
        topicId: topicId,
        difficulty: diff,
        questionText: `[Auto-Generated Mock] ${topicName} ${diff} Question ${i}`,
        referenceAnswer: `Detailed reference answer for testing ${topicName} ${diff} level question ${i}. Designed for AI validation.`
      });
    }
  };
  addLevel(basicCount, 'basic');
  addLevel(medCount, 'medium');
  addLevel(advCount, 'advanced');
};

generateMock(2, 'React.js', 50, 30, 20);
generateMock(3, 'Node.js', 50, 30, 20);
generateMock(4, 'System Design', 50, 30, 20);
generateMock(5, 'DSA', 50, 30, 20);

// Just in case JS questions aren't 100 on their own, pad them
const currentJsCount = questions.filter(q => q.topicId === 1).length;
if (currentJsCount < 100) {
  generateMock(1, 'JavaScript', 0, 0, 100 - currentJsCount);
}

const questionsSeeder = `'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = ${JSON.stringify(questions, null, 2)};
    const finalData = data.map(q => ({
      ...q,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    await queryInterface.bulkInsert('Questions', finalData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Questions', null, {});
  }
};`;

fs.writeFileSync(path.join(process.cwd(), 'seeders/20260415110512-init-questions.js'), questionsSeeder);

// Rewrite the topics seeder with the full 5 topics
const topics = [
  { id: 1, name: 'JavaScript', identifier: 'js', description: 'Variables, closures, async, scopes' },
  { id: 2, name: 'React.js', identifier: 'react', description: 'Components, hooks, virtual DOM' },
  { id: 3, name: 'Node.js', identifier: 'node', description: 'Event loop, streams, express' },
  { id: 4, name: 'System Design', identifier: 'system', description: 'Architecture, scalable backend patterns' },
  { id: 5, name: 'DSA', identifier: 'dsa', description: 'Arrays, Trees, Graphs, DP' }
];

const topicsSeeder = `'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = ${JSON.stringify(topics, null, 2)};
    const finalData = data.map(t => ({
      ...t,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    await queryInterface.bulkInsert('Topics', finalData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Topics', null, {});
  }
};`;

fs.writeFileSync(path.join(process.cwd(), 'seeders/20260415110511-init-topics.js'), topicsSeeder);

fs.unlinkSync('./temp_qs.js');

console.log('Seeders completed! Questions: ' + questions.length);
