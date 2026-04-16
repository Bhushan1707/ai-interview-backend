'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAchievement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      UserAchievement.belongsTo(models.User, { foreignKey: 'userId' });
      UserAchievement.belongsTo(models.Achievement, { foreignKey: 'achievementId' });
  
    }
  }
  UserAchievement.init({
    userId: DataTypes.INTEGER,
    achievementId: DataTypes.INTEGER,
    unlockedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserAchievement',
    paranoid: true,
  });
  return UserAchievement;
};