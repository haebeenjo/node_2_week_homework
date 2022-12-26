'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    // 댓글 작성자 외래키
    await queryInterface.addConstraint("Comments", {
      fields: ['owner_id'],
      type: 'foreign key',
      name: "Users_Comments_id_fk",
      references: {
        table: "Users",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });

    // 댓글이 어느 게시글에 달렸는지 외래키
    await queryInterface.addConstraint("Comments", {
      fields: ['post_id'],
      type: 'foreign key',
      name: 'Posts_Comments_id_fk',
      references: {
        table: "Posts",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });
  },

  async down (queryInterface, Sequelize) {
   
  }
};
