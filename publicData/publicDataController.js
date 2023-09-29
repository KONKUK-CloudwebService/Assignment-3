const publicDataService = require("./publicDataService");
const baseResponse = require("../utils/baseResponse");
const CustomException = require("../utils/handler/customException");
const { KEY_ERROR } = require("../utils/baseResponseStatus");

const getAllposts = async (req, res) => {
  try {
    const { page = 0, limit = 5 } = req.query;
    const offset = page * limit;

    const rows = await publicDataService.getAllposts(offset, limit);

    return baseResponse(rows, res);
  } catch (error) {
    console.log(error);
    return baseResponse(error, res);
  }
};

module.exports = {
  getAllposts,
};
