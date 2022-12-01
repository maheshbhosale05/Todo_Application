const express = require("express");

const { searchController } = require("../../controllers/search");

const search = express.Router();

search.get("/", searchController);

module.exports = { search };
