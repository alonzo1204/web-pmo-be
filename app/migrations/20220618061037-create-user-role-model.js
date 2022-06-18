'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_rol', {
      id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id:{
        type:Sequelize.DataTypes.INTEGER,
        defaultValue: null,
        reference:{
            model: "user",
            key: 'id'
        }
      },
      role_id:{
          type:Sequelize.DataTypes.INTEGER,
          defaultValue: null,
          reference:{
              model: "role",
              key: 'id'
          }
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_rol');
  }
};