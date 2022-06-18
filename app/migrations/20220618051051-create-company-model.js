'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('company', {
      id:{
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: Sequelize.DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null
    },
    image:{
        type: Sequelize.DataTypes.STRING(200),
        allowNull: true,
        defaultValue: null
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('company');
  }
};