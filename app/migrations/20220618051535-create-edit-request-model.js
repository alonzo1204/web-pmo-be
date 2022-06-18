'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('edit_request', {
      id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id:{
          type:Sequelize.DataTypes.INTEGER,
          allowNull: false,
          reference:{
              model: "user",
              key: 'id'
          }
      },
      project_id:{
          type:Sequelize.DataTypes.INTEGER,
          allowNull: false,
          reference:{
              model: "project",
              key: 'id'
          }
      },
      attribute_to_change:{
          type:Sequelize.DataTypes.STRING(100),
          allowNull: false,
      },
      value:{
          type:Sequelize.DataTypes.STRING(500),
          allowNull: false,
      },
      accepted:{
          type:Sequelize.DataTypes.INTEGER,
          defaultValue: null
      },
      request_date:{
          type:Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.DataTypes.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('edit_request');
  }
};