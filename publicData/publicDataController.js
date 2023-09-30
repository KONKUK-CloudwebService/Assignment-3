const publicDataService = require("./publicDataService");
const baseResponse = require("../utils/baseResponse");

const getAllposts = async (req, res) => {
  try {
    const { page = 0, limit = 5, title, content } = req.query;
    const offset = page * limit;

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

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      content,
      division,
      manager_department,
      manager_phone,
      url,
      cost,
    } = req.body;

    const result = await publicDataService.updatePost(
      id,
      title,
      content,
      division,
      manager_department,
      manager_phone,
      url,
      cost
    );

    return baseResponse({ id: id, info: result.info }, res);
  } catch (error) {
    console.log(error);
    return baseResponse(error, res);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await publicDataService.deletePost(id);

    return baseResponse({ id: `Data ${id} deleted successfully` }, res);
  } catch (error) {
    console.log(error);
    return baseResponse(error, res);
  }
};

module.exports = {
  getAllposts,
  updatePost,
  deletePost,
};
