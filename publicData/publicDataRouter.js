const express = require("express");
const router = express.Router();

const publicDataController = require("./publicDataController");

try {
  router.get("", publicDataController.getAllposts);
} catch (error) {
  console.log(error);
}

module.exports = {
  router,
};
