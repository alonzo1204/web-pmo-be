'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('semester', {
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
      date_from:{
          type:Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.DataTypes.NOW,
      },
      date_until:{
          type:Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.DataTypes.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('semester');
  }
};