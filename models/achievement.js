'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Achievement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      Achievement.belongsToMany(models.User, { through: models.UserAchievement, foreignKey: 'achievementId', as: 'users' });
  
    }
  }
  Achievement.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    icon: DataTypes.STRING,
    criteria: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Achievement',
    paranoid: true,
  });
  return Achievement;
};