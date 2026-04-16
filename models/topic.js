'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      Topic.hasMany(models.Question, { foreignKey: 'topicId', as: 'questions' });
      Topic.belongsToMany(models.User, { through: models.UserTopic, foreignKey: 'topicId', as: 'usersCompleted' });
  
    }
  }
  Topic.init({
    name: DataTypes.STRING,
    identifier: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Topic',
    paranoid: true,
  });
  return Topic;
};