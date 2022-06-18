'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('portfolio', {
      id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name:{
        type:Sequelize.DataTypes.STRING(50),
        defaultValue: null,
      },
      semester_id:{
          type:Sequelize.DataTypes.INTEGER,
          defaultValue: null,
          reference:{
              model: "semester",
              key: 'id'
          }
      },
      portfolio_state_id:{
          type:Sequelize.DataTypes.INTEGER,
          defaultValue: null,
          reference:{
              model: "portfolio_state",
              key: 'id'
          }
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('portfolio');
  }
};