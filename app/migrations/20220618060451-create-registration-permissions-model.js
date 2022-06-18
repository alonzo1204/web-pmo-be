'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('registration_permissions', {
      id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      code:{
        type:Sequelize.DataTypes.STRING(25),
        defaultValue: null,
        unique: true,
      },
      enabled:{
          type:Sequelize.DataTypes.INTEGER,
          defaultValue: null,
      },
      semester_id:{
          type:Sequelize.DataTypes.INTEGER,
          allowNull: false,
          reference:{
              model: "semester",
              key: 'id'
          }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('registration_permissions');
  }
};