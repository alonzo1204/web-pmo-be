const { Sequelize, DataTypes, Model } = require('sequelize');
const {sequelize}=require('../connections');

class projectProcessStateModel extends Model{}

projectProcessStateModel.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    state:{
        type:DataTypes.STRING(100),
        defaultValue: null,
    },
},{
    freezeTableName: true,
    sequelize, modelName:"project_process_state"
});


module.exports = {
    projectProcessStateModel
}