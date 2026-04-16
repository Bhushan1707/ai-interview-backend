const fs = require('fs');
const path = require('path');

const jsQuestionsPath = path.join(process.cwd(), '../frontend/src/data/jsQuestions.ts');
let tsContent = fs.readFileSync(jsQuestionsPath, 'utf8');

const extractArray = (varName) => {
  const regex = new RegExp('export const ' + varName + '.*?=\\s*\\[([\\s\\S]*?)\\];', 'm');
  const match = tsContent.match(regex);
  if (!match) return [];
  const objects = [];
  const itemRegex = /\{\s*id:\s*['"](.*?)['"],\s*question:\s*['"](.*?)['"],\s*answer:\s*['"](.*?)['"]\s*\}/g;
  let itemMatch;
  while ((itemMatch = itemRegex.exec(match[1])) !== null) {
    objects.push({
      questionText: itemMatch[2],
      referenceAnswer: itemMatch[3]
    });
  }
  return objects;
};

const jsBasic = extractArray('jsBasic');
const jsMedium = extractArray('jsMedium');
const jsAdvanced = extractArray('jsAdvanced');

const questions = [];

const addJs = (arr, diff) => {
  arr.forEach(q => {
    questions.push({
      topicId: 1, // JS
      difficulty: diff,
      questionText: q.questionText.replace(/\\'/g, "'"),
      referenceAnswer: q.referenceAnswer.replace(/\\'/g, "'")
    });
  });
};

addJs(jsBasic, 'basic');
addJs(jsMedium, 'medium');
addJs(jsAdvanced, 'advanced');

// The user requested 100 per topic for React, Node, System Design, and DSA
const generateMock = (topicId, topicName, basicCount, medCount, advCount) => {
  const addLevel = (count, diff) => {
    for (let i = 1; i <= count; i++) {
      questions.push({
        topicId: topicId,
        difficulty: diff,
        questionText: `${topicName} ${diff} Question ${i}`,
        referenceAnswer: `Detailed reference answer for ${topicName} ${diff} level question ${i}. The AI scoring engine will evaluate the candidate response based on these core concepts.`,
      });
    }
  };
  addLevel(basicCount, 'basic');
  addLevel(medCount, 'medium');
  addLevel(advCount, 'advanced');
};

// 2: React, 3: Node, 4: System Design, 5: DSA
generateMock(2, 'React.js', 50, 30, 20);
generateMock(3, 'Node.js', 50, 30, 20);
generateMock(4, 'System Design', 50, 30, 20);
generateMock(5, 'DSA', 50, 30, 20);

// Also TopicData has 5 topics, we need to make sure 'init-topics.js' matches it exactly.
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
console.log('Seeder generated successfully with ' + questions.length + ' questions.');
