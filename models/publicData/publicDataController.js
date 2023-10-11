const publicDataService = require("./publicDataService");
const baseResponse = require("../utils/baseResponse");
const { KEY_ERROR } = require("../utils/baseResponseStatus");
const axios = require("axios");

const createPost = async (req, res) => {
  try {
    const {
      title,
      content,
      division,
      manager_department,
      manager_phone,
      cost,
    } = req.body;

    const fileUrl = req.uploadedFileUrls;

    if (!title || !content) {
      throw new CustomException(KEY_ERROR);
    }

    const postId = await publicDataService.createPost(
      title,
      content,
      division,
      manager_department,
      manager_phone,
      fileUrl,
      cost,
      1
    );

    return baseResponse({ postId: `${postId.insertId}` }, res);
  } catch (error) {
    console.log(error);
    return baseResponse(error, res);
  }
};

const getAllposts = async (req, res) => {
  try {
    const url = process.env.META_DATA_URL;
    const response = await axios.get(url);
    const data = response.data;

    const headInfo = data.OrganicAnimalProtectionFacilit[0].head;

    const { page = 0, limit = 5, title, content } = req.query;
    const offset = page * limit;

    const rows = await publicDataService.getAllposts(
      offset,
      limit,
      title,
      content
    );

    return baseResponse({ headInfo, rows }, res);
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
  createPost,
  getAllposts,
  updatePost,
  deletePost,
};
