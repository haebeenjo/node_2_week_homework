'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
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

  },

  async down (queryInterface, Sequelize) {
    
  }
};
