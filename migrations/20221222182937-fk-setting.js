'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 게시글 작성자 외래키
    await queryInterface.addColumn("Posts", "owner_id", {
      allowNull: false,
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("Posts", {
      fields: ['owner_id'],
      type: 'foreign key',
      name:"Users_Posts_id_fk",
      references: {
        table: "Users",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });

    // 댓글 작성자 외래키
    await queryInterface.addColumn("Comments", "owner_id", {
      allowNull: false,
      type: Sequelize.INTEGER,
    });
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
    await queryInterface.addColumn("Comments", "post_id", {
      allowNull: false,
      type: Sequelize.INTEGER
    });
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};