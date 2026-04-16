'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      GroupMember.belongsTo(models.User, { foreignKey: 'userId' });
      GroupMember.belongsTo(models.StudyGroup, { foreignKey: 'groupId' });
  
    }
  }
  GroupMember.init({
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    joinedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'GroupMember',
    paranoid: true,
  });
  return GroupMember;
};