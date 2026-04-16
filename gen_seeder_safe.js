const fs = require('fs');
const path = require('path');

// Execute transpilation
const { execSync } = require('child_process');
execSync('npx tsc ../frontend/src/data/jsQuestions.ts --outDir ./temp --esModuleInterop --skipLibCheck');

// Require the compiled JS
const jsQuestions = require('./temp/jsQuestions.js');

const questions = [];

// Base Topics (to align IDs)
// 1 = JavaScript
// 2 = React.js
// 3 = Node.js
// 4 = System Design
// 5 = DSA

// Add actual JS questions from frontend file
const addJs = (arr, diff) => {
  if (!arr) return;
  arr.forEach(q => {
    questions.push({
      topicId: 1, 
      difficulty: diff,
      questionText: q.question, 
      referenceAnswer: q.answer
    });
  });
};

addJs(jsQuestions.jsBasic, 'basic');
addJs(jsQuestions.jsMedium, 'medium');
addJs(jsQuestions.jsAdvanced, 'advanced');

const generateMock = (topicId, topicName, basicCount, medCount, advCount) => {
  const addLevel = (count, diff) => {
    for (let i = 1; i <= count; i++) {
      questions.push({
        topicId: topicId,
        difficulty: diff,
        questionText: `[Auto-Generated] ${topicName} ${diff} Question ${i}`,
        referenceAnswer: `Detailed reference answer for ${topicName} ${diff} level question ${i}. This provides grading context to the AI system to evaluate candidate accuracy correctly.`,
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

const seederContent = `'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const questions = ${JSON.stringify(questions, null, 2)};
    
    const finalData = questions.map(q => ({
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

// Cleanup
fs.rmSync(path.join(process.cwd(), 'temp'), { recursive: true, force: true });

console.log('Seeder generated successfully with ' + questions.length + ' questions.');
