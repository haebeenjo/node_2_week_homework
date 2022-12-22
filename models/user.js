'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasMany(models.Post, { foreignKey: 'owner_id '}); 
      models.User.hasMany(models.Comment, { foreignKey: 'owner_id' });
    }
  }
  User.init({
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nickname:  DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};