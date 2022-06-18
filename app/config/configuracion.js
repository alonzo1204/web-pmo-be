module.exports = {
  username: 'root',
  password: '1234',
  database: 'db_pmo_dev',
  host: 'localhost',
  port: 3306,
  //TIMEOUT: 20000,
  dialect: 'mysql',

  migrationStorage:"sequelize",
  migrationStoragetableName:"migrations",

  define: {
    timestamps:false,
    underscored: true,
    freezeTableName: true
  }  
}