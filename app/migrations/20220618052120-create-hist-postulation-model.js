'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('history_postulations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      accepted:{
        type:Sequelize.DataTypes.INTEGER,
        defaultValue: null
      },
      project_1_id:{
          type:Sequelize.DataTypes.INTEGER,
          allowNull: false,
          reference:{
              model: "project",
              key: 'id'
          }
      },
      project_2_id:{
          type:Sequelize.DataTypes.INTEGER,
          allowNull: false,
          reference:{
              model: "project",
              key: 'id'
          }
      },
      project_3_id:{
          type:Sequelize.DataTypes.INTEGER,
          allowNull: false,
          reference:{
              model: "project",
              key: 'id'
          }
      },
      project_4_id:{
          type:Sequelize.DataTypes.INTEGER,
          allowNull: false,
          reference:{
              model: "project",
              key: 'id'
          }
      },
      iteration:{
          type:Sequelize.DataTypes.INTEGER,
          defaultValue: 1
      },
      postulation_date:{
          type:Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.DataTypes.NOW
      },
      group_weighted_average:{
          type:Sequelize.DataTypes.DECIMAL(10, 2),
          defaultValue: null
      },
      project_assigned:{
          type:Sequelize.DataTypes.INTEGER,
          defaultValue: null,
          reference:{
              model: "project",
              key: 'id'
          }
      },
      group_id:{
          type:Sequelize.DataTypes.INTEGER,
          allowNull: false,
          reference:{
              model: "group",
              key: 'id'
          }
      },
      update_date:{
          type:Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.DataTypes.NOW,
      },
      id_postulation_row:{
          type:Sequelize.DataTypes.INTEGER,
          allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('history_postulations');
  }
};