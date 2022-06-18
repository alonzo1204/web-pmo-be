'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('group', {
      id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      group_weighted_average:{
          type:Sequelize.DataTypes.DECIMAL(10, 2),
          defaultValue: null
      },
      student_1_id:{
          type:Sequelize.DataTypes.INTEGER,
          defaultValue: null,
          reference:{
              model: "user",
              key: 'id'
          }
      },
      student_2_id:{
          type:Sequelize.DataTypes.INTEGER,
          defaultValue: null,
          reference:{
              model: "user",
              key: 'id'
          }
      },
      project_assigned:{
          type:Sequelize.DataTypes.INTEGER,
          defaultValue: null,
          reference:{
              model: "project",
              key: 'id'
          }
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('group');
  }
};