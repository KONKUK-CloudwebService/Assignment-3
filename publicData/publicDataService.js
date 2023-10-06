const { NONE_EXIST_DATA } = require("../utils/baseResponseStatus");
const CustomException = require("../utils/handler/customException");
const publicDataDao = require("./publicDataDao");
const { deleteImageFromS3 } = require("../utils/s3/imageUploader");

const createPost = async (
  title,
  content,
  division,
  manager_department,
  manager_phone,
  fileUrl,
  cost,
  user_id
) => {
  try {
    const postResult = await publicDataDao.createPost(
      title,
      content,
      division,
      manager_department,
      manager_phone,
      fileUrl,
      cost,
      user_id
    );

    return postResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllposts = async (offset, limit, title, content) => {
  try {
    return await publicDataDao.getAllposts(offset, limit, title, content);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updatePost = async (
  id,
  title,
  content,
  division,
  manager_department,
  manager_phone,
  url,
  cost
) => {
  try {
    const s3Image = await publicDataDao.getImagesByPostId(id); // 해당 포스트의 기존 이미지 URL 가져오기
    await deleteImageFromS3(s3Image[0].url); // S3에서 기존 객체를 삭제

    return await publicDataDao.updatePost(
      id,
      title,
      content,
      division,
      manager_department,
      manager_phone,
      url,
      cost
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deletePost = async (id) => {
  try {
    const data = await publicDataDao.getDataById(id);
    if (data.length === 0) {
      throw new CustomException(NONE_EXIST_DATA);
    }

    return await publicDataDao.deletePost(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  createPost,
  getAllposts,
  updatePost,
  deletePost,
};
