
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  //origin access control, our reacat app will make requests to the server from port:3000
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
  //  console.log("'force : false ' so the database will not drop and recreate");
  console.log("Drop and sync tables")
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

require("./app/routes/capexp.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});