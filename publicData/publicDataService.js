const publicDataDao = require("./publicDataDao");

const getAllposts = async (offset, limit, title, content) => {
  try {
    return await publicDataDao.getAllposts(offset, limit, title, content);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getAllposts,
};
