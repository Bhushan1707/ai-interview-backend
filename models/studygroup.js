'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudyGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      StudyGroup.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' });
      StudyGroup.hasMany(models.GroupMember, { foreignKey: 'groupId', as: 'memberships' });
      StudyGroup.belongsToMany(models.User, { through: models.GroupMember, foreignKey: 'groupId', as: 'members' });
      StudyGroup.hasMany(models.GroupInvite, { foreignKey: 'groupId', as: 'invites' });
  
    }
  }
  StudyGroup.init({
    name: DataTypes.STRING,
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StudyGroup',
    paranoid: true,
  });
  return StudyGroup;
};