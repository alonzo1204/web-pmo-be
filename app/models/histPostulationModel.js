const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');

class histPostulationModel extends Model{}

histPostulationModel.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    accepted:{
        type:DataTypes.INTEGER,
        defaultValue: null
    },
    project_1_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    project_2_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    project_3_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    project_4_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    iteration:{
        type:DataTypes.INTEGER,
        defaultValue: 1
    },
    postulation_date:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    group_weighted_average:{
        type:DataTypes.DECIMAL(10, 2),
        defaultValue: null
    },
    project_assigned:{
        type:DataTypes.INTEGER,
        defaultValue: null
    },
    group_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    update_date:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    id_postulation_row:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
},{
    freezeTableName: true,
    sequelize, modelName:"history_postulations"
});


module.exports = {
    histPostulationModel
}