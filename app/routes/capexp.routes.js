module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new user
  router.post("/", users.create);

  // Retrieve all users
  router.get("/", users.findAll);

  // Retrieve all published users
  router.get("/published", users.findAllPublished);

  // Retrieve a single user with id
  router.get("/:id", users.findOne);

  // Update a user with id
  router.put("/:id", users.update);

  // Delete a user with id
  router.delete("/:id", users.delete);

  // Delete all users
  router.delete("/", users.deleteAll);

  const projects = require("../controllers/project.controller.js");


  // Create a new Project
  router.post("/", projects.create);

  // Retrieve all Projects
  router.get("/", projects.findAll);

  // Retrieve all published Projects
  router.get("/published", projects.findAllPublished);

  // Retrieve a single Project with id
  router.get("/:id", projects.findOne);

  // Update a Project with id
  router.put("/:id", projects.update);

  // Delete a Project with id
  router.delete("/:id", projects.delete);

  // Delete all Projects
  router.delete("/", projects.deleteAll);

  app.use('/api/users', router);
};