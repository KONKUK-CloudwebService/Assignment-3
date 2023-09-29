const publicDataService = require("./publicDataService");
const baseResponse = require("../utils/baseResponse");

const getAllposts = async (req, res) => {
  try {
    const { page = 0, limit = 5, title, content } = req.query;
    const offset = page * limit;

    console.log(title, content);
    const rows = await publicDataService.getAllposts(
      offset,
      limit,
      title,
      content
    );

    return baseResponse(rows, res);
  } catch (error) {
    console.log(error);
    return baseResponse(error, res);
  }
};

module.exports = {
  getAllposts,
};
