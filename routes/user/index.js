const express = require("express");

const { signUpController, loginController } = require("../../controllers/user");

const user = express.Router();

user.post("/signUp", signUpController);

user.post("/login", loginController);

module.exports = { user };