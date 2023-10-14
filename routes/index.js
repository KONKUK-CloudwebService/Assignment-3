const express = require("express");
const router = express.Router();

// const userRouter = require("./userRouter");
const publicDataRouter = require("../models/publicData/publicDataRouter");
const communityRouter = require("../models/community/controller/index");
const dataRequestRouter = require("../models/dataRequest/controller/index");
const dataUseRouter = require("../models/dataUse/controller/index");
const userRouter = require("../models/user/controller/index");

// router.use("/users", userRouter.router);
router.use("/resources", publicDataRouter.router);
router.use(communityRouter.path, communityRouter.router);
router.use(dataRequestRouter.path, dataRequestRouter.router);
router.use(dataUseRouter.path, dataUseRouter.router);
router.use(userRouter.path, userRouter.router);

module.exports = router;
