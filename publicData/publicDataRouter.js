const express = require("express");
const router = express.Router();

const publicDataController = require("./publicDataController");
const { imageUploader, uploadToS3 } = require("../utils/s3/imageUploader");

try {
  router.post("", imageUploader, uploadToS3, publicDataController.createPost);
  router.get("", publicDataController.getAllposts);
  router.put(
    "/:id",
    imageUploader,
    uploadToS3,
    publicDataController.updatePost
  );
  router.delete("/:id", publicDataController.deletePost);
} catch (error) {
  console.log(error);
}

module.exports = {
  router,
};
