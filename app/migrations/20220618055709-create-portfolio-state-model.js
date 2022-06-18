'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('portfolio_state', {
      id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      state:{
        type:Sequelize.DataTypes.STRING(50),
        defaultValue: null,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('portfolio_state');
  }
};