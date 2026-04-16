'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      User.hasMany(models.StudyGroup, { foreignKey: 'ownerId', as: 'ownedGroups' });
      User.hasMany(models.GroupMember, { foreignKey: 'userId', as: 'memberships' });
      User.belongsToMany(models.StudyGroup, { through: models.GroupMember, foreignKey: 'userId', as: 'groups' });
      User.hasMany(models.InterviewSession, { foreignKey: 'userId', as: 'interviews' });
      User.belongsToMany(models.Topic, { through: models.UserTopic, foreignKey: 'userId', as: 'completedTopics' });
      User.belongsToMany(models.Achievement, { through: models.UserAchievement, foreignKey: 'userId', as: 'achievements' });
  
    }
  }
  User.init({
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    displayName: DataTypes.STRING,
    contact: {
      type: DataTypes.STRING,
      allowNull: true
    },
    xp: DataTypes.INTEGER,
    avatarUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
  });
  return User;
};