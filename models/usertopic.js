'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTopic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      UserTopic.belongsTo(models.User, { foreignKey: 'userId' });
      UserTopic.belongsTo(models.Topic, { foreignKey: 'topicId' });
  
    }
  }
  UserTopic.init({
    userId: DataTypes.INTEGER,
    topicId: DataTypes.INTEGER,
    completedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserTopic',
    paranoid: true,
  });
  return UserTopic;
};