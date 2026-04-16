const fs = require('fs');
const path = require('path');

const jsQuestionsPath = path.join(process.cwd(), '../frontend/src/data/jsQuestions.ts');
const lines = fs.readFileSync(jsQuestionsPath, 'utf8').split('\n');

const questions = [];
let currentDiff = null;

lines.forEach(line => {
  if (line.includes('export const jsBasic')) currentDiff = 'basic';
  else if (line.includes('export const jsMedium')) currentDiff = 'medium';
  else if (line.includes('export const jsAdvanced')) currentDiff = 'advanced';
  
  if (currentDiff && line.trim().startsWith('{')) {
    // We only need to capture question and answer.
    const qMatch = line.match(/question:\s*"(.*?)",\s*answer:/);
    const aMatch = line.match(/answer:\s*"(.*)"\s*\}\s*,?/);
    
    if (qMatch && aMatch) {
      questions.push({
        topicId: 1, // JS
        difficulty: currentDiff,
        questionText: qMatch[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\'),
        referenceAnswer: aMatch[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\')
      });
    }
  }
});

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

const seederContent = `'use strict';

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

fs.writeFileSync(path.join(process.cwd(), 'seeders/20260415110512-init-questions.js'), seederContent);
console.log('Seeder generated successfully with ' + questions.length + ' questions.');
