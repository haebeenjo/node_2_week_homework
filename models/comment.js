'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    
    static associate(models) {
      models.Comment.belongsTo(models.User, { foreignKey: "owner_id"}); 
      models.Comment.belongsTo(models.Post, { foreignKey: "post_id"}); 
    }
  }
  Comment.init({
    content: DataTypes.TEXT,
    // post_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};