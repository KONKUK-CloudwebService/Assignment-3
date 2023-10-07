const express = require("express");
const router = express.Router();

// const userRouter = require("./userRouter");
const publicDataRouter = require("../publicData/publicDataRouter");

// router.use("/users", userRouter.router);
router.use("/resources", publicDataRouter.router);

module.exports = router;
