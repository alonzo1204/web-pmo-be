'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('application_settings', {
      id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    portfolio_id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull: false,
        reference:{
            model: "portfolio" ,
            key: 'id'
        }
    }, 
    front_url:{
        type:Sequelize.DataTypes.STRING(200),
        allowNull: false,
    }, 
    back_url:{
        type:Sequelize.DataTypes.STRING(200),
        allowNull: false,
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('application_settings');
  }
};