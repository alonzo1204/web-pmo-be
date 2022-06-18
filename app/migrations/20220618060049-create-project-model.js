'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('project', {
      id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      code:{
        type:Sequelize.DataTypes.STRING(45),
        allowNull: false,
        unique: true,
      },
      name:{
          type:Sequelize.DataTypes.STRING(150),
          allowNull: false,
      },
      description:{
          type:Sequelize.DataTypes.STRING(250),
          defaultValue: null
      },
      general_objective:{
          type:Sequelize.DataTypes.STRING(250),
          defaultValue: 'GENERAL OBJECTIVE VALUE'
      },
      specific_objetive_1:{
          type:Sequelize.DataTypes.STRING(250),
          defaultValue: 'SPECIFIC OBJECTIVE 1 VALUE'
      },
      specific_objetive_2:{
          type:Sequelize.DataTypes.STRING(250),
          defaultValue: 'SPECIFIC OBJECTIVE 2 VALUE'
      },
      specific_objetive_3:{
          type:Sequelize.DataTypes.STRING(250),
          defaultValue: 'SPECIFIC OBJECTIVE 3 VALUE'
      },
      specific_objetive_4:{
          type:Sequelize.DataTypes.STRING(250),
          defaultValue: 'SPECIFIC OBJECTIVE 4 VALUE'
      },
      paper:{
          type:Sequelize.DataTypes.INTEGER,
          allowNull: false,
      },
      devices:{
          type:Sequelize.DataTypes.INTEGER,
          allowNull: false,
      },
      url_file:{
          type:Sequelize.DataTypes.STRING(250),
          defaultValue: null,
      },
      url_sharepoint:{
          type:Sequelize.DataTypes.STRING(250),
          defaultValue: null,
      },
      career_id:{
          type:Sequelize.DataTypes.INTEGER,
          allowNull: false,
          reference:{
              model: "career",
              key: 'id'
          }
      },
      product_owner_id:{
          type:Sequelize.DataTypes.INTEGER,
          defaultValue: null,
          reference:{
              model: "user",
              key: 'id'
          }
      },
      portfolio_manager_id:{
          type:Sequelize.DataTypes.INTEGER,
          defaultValue: null,
          reference:{
              model: "user",
              key: 'id'
          }
      },
      co_autor_id:{
          type:Sequelize.DataTypes.INTEGER,
          defaultValue: null,
          reference:{
              model: "user",
              key: 'id'
          }
      },
      project_process_state_id:{
          type:Sequelize.DataTypes.INTEGER,
          allowNull: false,
          reference:{
              model: "project_process_state",
              key: 'id'
          }
      },
      company_id:{
          type:Sequelize.DataTypes.INTEGER,
          allowNull: false,
          reference:{
              model: "company",
              key: 'id'
          }
      },
      group_id:{
          type:Sequelize.DataTypes.INTEGER,
          defaultValue: null,
          reference:{
              model: "group",
              key: 'id'
          }
      },
      portfolio_id:{
          type:Sequelize.DataTypes.INTEGER,
          defaultValue: null,
          reference:{
              model: "portfolio",
              key: 'id'
          }
      },
      semester_id:{
          type:Sequelize.DataTypes.INTEGER,
          defaultValue: null,
          reference:{
              model: "semester",
              key: 'id'
          }
      },
      comments:{
          type:Sequelize.DataTypes.STRING(350),
          defaultValue: null,
      },
      update_date:{
          type:Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.DataTypes.NOW,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('project');
  }
};