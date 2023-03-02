module.exports = app => {
   const projects = require("../controllers/project.controller.js");
 
   var router = require("express").Router();
 
   // Create a new project
   router.post("/", projects.create);
 
   // Retrieve all projects
   // home page for projects api
   router.get("/", projects.findAll);
 
   // Retrieve all published projects
   router.get("/published", projects.findAllPublished);
 
   // Retrieve a single project with id
   router.get("/:id", projects.findOne);
 
   // Update a project with id
   router.put("/:id", projects.update);

   // Update a projects capital expenditure 
   router.put("/updateCapExp/:id", projects.updateCapExp);
 
   // Delete a project with id
   router.delete("/:id", projects.delete);
 
   // Delete all projects
   router.delete("/", projects.deleteAll);
 
   app.use('/api/projects', router);
 };