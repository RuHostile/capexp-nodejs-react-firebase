module.exports = (sequelize, Sequelize) => {
   const Project = sequelize.define("project", {
     projectName: {
       type: Sequelize.STRING,
     },
     description: {
       type: Sequelize.STRING,
     },
     department: {
       type: Sequelize.STRING,
     },
     capexp: {
       type: Sequelize.INTEGER,
     },
   });
 
   return Project;
 };
 