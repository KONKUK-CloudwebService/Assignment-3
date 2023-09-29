const publicData = require("./publicDataDao");

const getAllposts = async () => {
  try {
    return publicData.getAllposts();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getAllposts,
};
