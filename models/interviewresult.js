'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InterviewResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      InterviewResult.belongsTo(models.InterviewSession, { foreignKey: 'sessionId', as: 'session' });
      InterviewResult.belongsTo(models.Question, { foreignKey: 'questionId', as: 'question' });
  
    }
  }
  InterviewResult.init({
    sessionId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    userAnswer: DataTypes.TEXT,
    grade: DataTypes.STRING,
    pointsEarned: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InterviewResult',
    paranoid: true,
  });
  return InterviewResult;
};