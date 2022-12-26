'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    
    static associate(models) {
      models.Post.belongsTo(models.User, { foreignKey: "owner_id" });
      models.Post.hasMany(models.Comment, { foreignKey: "post_id" });  
    }
  }
  Post.init({
    title: {type: DataTypes.STRING, allowNull: false,},
    content: DataTypes.STRING,
    // owner_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};