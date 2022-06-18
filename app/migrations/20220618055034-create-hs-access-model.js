'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hs_access', {
      id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      role_id:{
          type:Sequelize.DataTypes.INTEGER,
          allowNull: false,
          reference:{
              model: "role",
              key: 'id'
          }
      },
      token:{
          type:Sequelize.DataTypes.STRING(150),
          allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('hs_access');
  }
};