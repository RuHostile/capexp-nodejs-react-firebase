const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//dont forget to call sync() method in server.js
const db = require("./app/models");
// db.sequelize.sync()
db.sequelize.sync({ force: true }).then(() => {
   console.log("Drop and re-sync db.");
 });
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my capital expenditure tracker application." });
});

require("./app/routes/user.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});