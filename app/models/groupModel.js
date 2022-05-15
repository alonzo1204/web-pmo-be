const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');
const { projectModel } = require('./projectModel');
const { userModel } = require('./userModel');

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
        defaultValue: null,
        reference:{
            model: userModel,
            key: 'id'
        }
    },
    student_2_id:{
        type:DataTypes.INTEGER,
        defaultValue: null,
        reference:{
            model: userModel,
            key: 'id'
        }
    },
    project_assigned:{
        type:DataTypes.INTEGER,
        defaultValue: null,
        reference:{
            model: projectModel,
            key: 'id'
        }
    },
},{
    freezeTableName: true,
    sequelize, modelName:'group'
});

groupModel.associate=function(){
    //Group
    /*groupModel.belongsTo(projectModel,{
        foreignKey: "project_assigned",
    });*/
    groupModel.belongsTo(userModel,{foreignKey: "student_1_id",})
}


module.exports = {
    groupModel
}