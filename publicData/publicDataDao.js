const { DATABASE_ERROR } = require("../utils/baseResponseStatus");
const CustomException = require("../utils/handler/customException");
const appDataSource = require("../models/appDataSource");

const getAllposts = async () => {
  try {
    return await appDataSource.query(
      `
      SELECT 
          title,
          content,
          division,
          manager_department,
          manager_phone,
          url,
          cost,
          created_at
      FROM data;
        `
    );
  } catch (err) {
    throw new CustomException(DATABASE_ERROR);
  }
};

module.exports = {
  getAllposts,
};
