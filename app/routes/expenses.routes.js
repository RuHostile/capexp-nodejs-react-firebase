module.exports = app => {
   const expenses = require("../controllers/expense.controller.js");
 
   var router = require("express").Router();
 
   // Create a new user
   router.post("/", expenses.create);
 
   // Retrieve all expenses
   // home page for expenses
   router.get("/", expenses.findAll);
 
   // Retrieve all published expenses
   router.get("/published", expenses.findAllPublished);
 
   // Retrieve a single user with id
   router.get("/:id", expenses.findOne);
 
   // Update a user with id
   router.put("/:id", expenses.update);
 
   // Delete a user with id
   router.delete("/:id", expenses.delete);
 
   // Delete all expenses
   router.delete("/", expenses.deleteAll);
 
   //expenses page
   router.get("/expenses", function(req, res) {
     res.send("About this wiki");
   });
 
   app.use('/api/expenses', router);
 };