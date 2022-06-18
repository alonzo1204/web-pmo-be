'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      code:{
        type:Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      firstname:{
          type:Sequelize.DataTypes.STRING(150),
          allowNull: false,
      },
      lastname:{
          type:Sequelize.DataTypes.STRING(150),
          allowNull: false,
      },
      weighted_average:{
          type:Sequelize.DataTypes.DECIMAL(10, 2),
          defaultValue: null
      },
      password:{
          type:Sequelize.DataTypes.STRING(200),
          allowNull: false,
      },
      active:{
          type:Sequelize.DataTypes.INTEGER,
          defaultValue: 1
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
};