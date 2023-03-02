const db = require("../models");
const Expense = db.expenses;

const Op = db.Sequelize.Op;

// Create and Save a new Expense
exports.create = (req, res) => {
  //validate request
  if (!req.body.expenseName) {
    res.status(400).send({
      message: "Content expenseName cannot be empty!",
    });
    return;
  }
  //Create a Expense
  const expense = {
    expenseName: req.body.expenseName,
    amount: req.body.amount,
    projectID: req.body.projectID,
    userID: req.body.userID,
  };
  //Save Expense in the database
  Expense.create(expense)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Expense.",
      });
    });
};

//Retrieve objects with condition
exports.findAll = (req, res) => {
  const expenseName = req.query.expenseName;
  var condition = expenseName
    ? { expenseName: { [Op.like]: `%${expenseName}%` } }
    : null;

  Expense.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Expenses.",
      });
    });
};

// Retrieve expesnses with projectID
exports.findByProjectID = (req, res) => {
  const projectID = req.query.projectID;

  Expense.findAll({ where: { projectID: projectID } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Expenses.",
      });
    });
};

// Retrieve all expense amounts with project ID
exports.getAmountsWithProjectID = (req, res) => {
  const projectID = req.query.projectID;
  Expense.findAll({ attributes: ["amount"], where: { projectID: projectID } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Expenses.",
      });
    });
};

//Retrieve a single object
exports.findOne = (req, res) => {
  const id = req.params.id;

  Expense.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Expense with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Expense with id=" + id,
      });
    });
};

//Update an object
exports.update = (req, res) => {
  const id = req.params.id;

  Expense.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Expense was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Expense with id=${id}. Maybe Expense was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Expense with id=" + id,
      });
    });
};

//Delete an object
exports.delete = (req, res) => {
  const id = req.params.id;

  Expense.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Expense was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Expense with id=${id}. Maybe Expense was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Expense with id=" + id,
      });
    });
};

//Delete all objects
exports.deleteAll = (req, res) => {
  Expense.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Expenses were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Expenses.",
      });
    });
};

//Find all objects by condition
exports.findAllPublished = (req, res) => {
  Expense.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Expenses.",
      });
    });
};
