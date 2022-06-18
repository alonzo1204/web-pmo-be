'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('role', {
      id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name:{
        type:Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      access:{
          type:Sequelize.DataTypes.STRING(500),
          defaultValue: null,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('role');
  }
};