'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupInvite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      GroupInvite.belongsTo(models.StudyGroup, { foreignKey: 'groupId', as: 'group' });
      GroupInvite.belongsTo(models.User, { foreignKey: 'senderId', as: 'sender' });
      GroupInvite.belongsTo(models.User, { foreignKey: 'receiverId', as: 'receiver' });
  
    }
  }
  GroupInvite.init({
    groupId: DataTypes.INTEGER,
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GroupInvite',
    paranoid: true,
  });
  return GroupInvite;
};