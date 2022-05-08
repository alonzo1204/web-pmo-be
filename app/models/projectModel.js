const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');

class projectModel extends Model{}

projectModel.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    code:{
        type:DataTypes.STRING(45),
        allowNull: false,
        unique: true,
    },
    name:{
        type:DataTypes.STRING(150),
        allowNull: false,
    },
    description:{
        type:DataTypes.STRING(250),
        defaultValue: null
    },
    general_objective:{
        type:DataTypes.STRING(250),
        defaultValue: 'GENERAL OBJECTIVE VALUE'
    },
    specific_objetive_1:{
        type:DataTypes.STRING(250),
        defaultValue: 'SPECIFIC OBJECTIVE 1 VALUE'
    },
    specific_objetive_2:{
        type:DataTypes.STRING(250),
        defaultValue: 'SPECIFIC OBJECTIVE 2 VALUE'
    },
    specific_objetive_3:{
        type:DataTypes.STRING(250),
        defaultValue: 'SPECIFIC OBJECTIVE 3 VALUE'
    },
    specific_objetive_4:{
        type:DataTypes.STRING(250),
        defaultValue: 'SPECIFIC OBJECTIVE 4 VALUE'
    },
    paper:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    devices:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    url_file:{
        type:DataTypes.STRING(250),
        defaultValue: null,
    },
    url_sharepoint:{
        type:DataTypes.STRING(250),
        defaultValue: null,
    },
    career_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    product_owner_id:{
        type:DataTypes.INTEGER,
        defaultValue: null,
    },
    portfolio_manager_id:{
        type:DataTypes.INTEGER,
        defaultValue: null,
    },
    co_autor_id:{
        type:DataTypes.INTEGER,
        defaultValue: null,
    },
    project_process_state_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    company_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    group_id:{
        type:DataTypes.INTEGER,
        defaultValue: null,
    },
    portfolio_id:{
        type:DataTypes.INTEGER,
        defaultValue: null,
    },
    semester_id:{
        type:DataTypes.INTEGER,
        defaultValue: null,
    },
    comments:{
        type:DataTypes.STRING(350),
        defaultValue: null,
    },
    update_date:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
},{
    freezeTableName: true,
    sequelize, modelName:"project"
});


module.exports = {
    projectModel
}