'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class companyModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  companyModel.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null
    },
    image:{
        type: DataTypes.STRING(200),
        allowNull: true,
        defaultValue: null
    }
},{
    freezeTableName: true,
    sequelize, modelName:'company'
});
  return companyModel;
};