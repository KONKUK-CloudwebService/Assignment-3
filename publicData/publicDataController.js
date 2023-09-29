const publlidDataService = require("./publlidDataService");
const baseResponse = require("../utils/baseResponse");

const getAllposts = async (req, res) => {
  try {
    const rows = await publlidDataService.getAllposts();
    return baseResponse(rows, res);
  } catch (error) {
    console.log(error);
    return baseResponse(error, res);
  }
};

module.exports = {
  getAllposts,
};
