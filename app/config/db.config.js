module.exports = {
   HOST: "localhost",
   USER: "root",
   PASSWORD: "Tricay!1",
   DB: "capexptrackerdb",
   dialect: "mysql",
   pool: {
     max: 5,
     min: 0,
     acquire: 30000,
     idle: 10000
   }
 };