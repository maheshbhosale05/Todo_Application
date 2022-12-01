const express = require("express");

const { 
    getCategoryController, 
    addCategoryController, 
    deleteCategoryController
} = require("../../controllers/category");

const category = express.Router();

category
.route("/")
.get(getCategoryController)
.post(addCategoryController)
.delete(deleteCategoryController);

module.exports = { category };
