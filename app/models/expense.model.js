module.exports = (sequelize, Sequelize) => {
   const Expense = sequelize.define("expense", {
     expenseName: {
       type: Sequelize.STRING,
     },
     amount: {
       type: Sequelize.INTEGER,
     },
     projectID: {
       type: Sequelize.INTEGER,
     },
     userID: {
       type: Sequelize.INTEGER,
     },
   });
 
   return Expense;
 };
 