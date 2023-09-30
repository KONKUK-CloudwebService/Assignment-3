const publicDataDao = require("./publicDataDao");

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

module.exports = {
  getAllposts,
  updatePost,
};
