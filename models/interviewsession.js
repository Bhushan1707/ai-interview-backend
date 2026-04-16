'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InterviewSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      InterviewSession.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      InterviewSession.belongsTo(models.Topic, { foreignKey: 'topicId', as: 'topic' });
      InterviewSession.hasMany(models.InterviewResult, { foreignKey: 'sessionId', as: 'results' });
  
    }
  }
  InterviewSession.init({
    userId: DataTypes.INTEGER,
    topicId: DataTypes.INTEGER,
    totalScore: DataTypes.INTEGER,
    maxScore: DataTypes.INTEGER,
    completedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'InterviewSession',
    paranoid: true,
  });
  return InterviewSession;
};