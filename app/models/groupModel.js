const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');

class groupModel extends Model{}

groupModel.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    group_weighted_average:{
        type:DataTypes.DECIMAL(10, 2),
        defaultValue: null
    },
    student_1_id:{
        type:DataTypes.INTEGER,
        defaultValue: null
    },
    student_2_id:{
        type:DataTypes.INTEGER,
        defaultValue: null
    },
    project_assigned:{
        type:DataTypes.INTEGER,
        defaultValue: null
    },
},{
    freezeTableName: true,
    sequelize, modelName:"group"
});


module.exports = {
    groupModel
}