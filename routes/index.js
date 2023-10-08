const express = require("express");
const router = express.Router();

// const userRouter = require("./userRouter");
const publicDataRouter = require("../publicData/publicDataRouter");
const communityRouter = require('../models/community/controller/index');
const dataUseRouter = require('../models/dataUse/controller/index');
// router.use("/users", userRouter.router);
router.use("/resources", publicDataRouter.router);
router.use(communityRouter.path,communityRouter.router);
router.use(dataUseRouter.path,dataUseRouter.router);


module.exports = router;
