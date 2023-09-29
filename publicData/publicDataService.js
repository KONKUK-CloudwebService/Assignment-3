const publicData = require("./publicDataDao");

const getAllposts = async (offset, limit) => {
  try {
    return publicData.getAllposts(offset, limit);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getAllposts,
};
