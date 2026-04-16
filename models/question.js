'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      Question.belongsTo(models.Topic, { foreignKey: 'topicId', as: 'topic' });
  
    }
  }
  Question.init({
    topicId: DataTypes.INTEGER,
    difficulty: DataTypes.STRING,
    questionText: DataTypes.TEXT,
    referenceAnswer: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Question',
    paranoid: true,
  });
  return Question;
};