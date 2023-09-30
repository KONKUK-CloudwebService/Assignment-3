const express = require("express");
const router = express.Router();

const publicDataController = require("./publicDataController");

try {
  router.get("", publicDataController.getAllposts);
  router.put("/:id", publicDataController.updatePost);
} catch (error) {
  console.log(error);
}

module.exports = {
  router,
};
