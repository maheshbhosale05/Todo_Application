const express = require("express");

const { 
    getTaskController, 
    addTaskController, 
    deleteTaskController
} = require("../../controllers/task");

const task = express.Router();

task
.route("/")
.get(getTaskController)
.post(addTaskController)
.delete(deleteTaskController);

module.exports = { task };
