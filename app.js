require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const { user } = require("./routes/user");
const { category } = require("./routes/category");
const { task } = require("./routes/task");
const { search } = require("./routes/search");

const app = express();

// database connection.
connectDB();

// MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // URL Encoding option

app.use("/user", user);

app.use("/category", category);

app.use("/task", task);

app.use("/search", search);

module.exports = app;



