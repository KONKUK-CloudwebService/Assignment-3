const { DATABASE_ERROR } = require("../utils/baseResponseStatus");
const CustomException = require("../utils/handler/customException");
const appDataSource = require("../models/appDataSource");

const getAllposts = async (offset, limit, title, content) => {
  try {
    let query = `
      SELECT 
          title,
          content,
          division,
          manager_department,
          manager_phone,
          url,
          cost,
          created_at
      FROM data
    `;

    let queryParams = [];
    let whereClauses = [];

    if (title) {
      whereClauses.push(`title LIKE ?`);
      queryParams.push(`%${title}%`);
    }

    if (content) {
      whereClauses.push(`content LIKE ?`);
      queryParams.push(`%${content}%`);
    }

    if (whereClauses.length > 0) {
      query += " WHERE " + whereClauses.join(" AND ");
    }

    query += " LIMIT ? OFFSET ?";
    queryParams.push(parseInt(limit), parseInt(offset));

    return await appDataSource.query(query, queryParams);
  } catch (err) {
    console.log(err);
    throw new CustomException(DATABASE_ERROR);
  }
};

module.exports = {
  getAllposts,
};
