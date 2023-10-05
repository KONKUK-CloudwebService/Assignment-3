const express = require("express");
const router = express.Router();

// const userRouter = require("./userRouter");
const publicDataRouter = require("../publicData/publicDataRouter");

// router.use("/users", userRouter.router);
router.use("/datas", publicDataRouter.router);

module.exports = router;
