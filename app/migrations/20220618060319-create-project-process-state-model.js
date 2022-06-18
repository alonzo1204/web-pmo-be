'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('project_process_state', {
      id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name:{
        type:Sequelize.DataTypes.STRING(100),
        defaultValue: null,
    },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('project_process_state');
  }
};