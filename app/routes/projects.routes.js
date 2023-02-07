module.exports = app => {
   const projects = require("../controllers/project.controller.js");
 
   var router = require("express").Router();
 
   // Create a new user
   router.post("/", projects.create);
 
   // Retrieve all projects
   // home page for projects
   router.get("/", projects.findAll);
 
   // Retrieve all published projects
   router.get("/published", projects.findAllPublished);
 
   // Retrieve a single user with id
   router.get("/:id", projects.findOne);
 
   // Update a user with id
   router.put("/:id", projects.update);
 
   // Delete a user with id
   router.delete("/:id", projects.delete);
 
   // Delete all projects
   router.delete("/", projects.deleteAll);
 
   //projects page
   router.get("/projects", function(req, res) {
     res.send("About this wiki");
   });
 
   app.use('/api/projects', router);
 };