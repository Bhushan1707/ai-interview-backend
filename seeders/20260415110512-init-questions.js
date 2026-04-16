'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  async up(queryInterface, Sequelize) {
    const questionsFile = path.join(__dirname, '..', 'interview_questions.json');
    if (!fs.existsSync(questionsFile)) {
      console.warn(`Could not find interview_questions.json at ${questionsFile}`);
      return;
    }

    const rawData = fs.readFileSync(questionsFile, 'utf8');
    const parsedQuestions = JSON.parse(rawData);
    const now = new Date();
    
    const questions = parsedQuestions.map(q => ({
      topicId: q.topicId,
      difficulty: q.difficulty,
      questionText: q.questionText,
      referenceAnswer: q.referenceAnswer,
      createdAt: now,
      updatedAt: now
    }));

    await queryInterface.bulkInsert('Questions', questions, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Questions', null, {});
  }
};