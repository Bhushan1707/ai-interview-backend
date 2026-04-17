'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserQuestion extends Model {
    static associate(models) {
      UserQuestion.belongsTo(models.User, { foreignKey: 'userId' });
      UserQuestion.belongsTo(models.Question, { foreignKey: 'questionId' });
    }
  }
  UserQuestion.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('completed'),
      defaultValue: 'completed'
    }
  }, {
    sequelize,
    modelName: 'UserQuestion',
    // paranoid: false (default), ensuring no deletedAt
  });
  return UserQuestion;
};
