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
    let query = `
      UPDATE data
      SET 
        title = COALESCE(?, title),
        content = COALESCE(?, content),
        division = COALESCE(?, division),
        manager_department = COALESCE(?, manager_department),
        manager_phone = COALESCE(?, manager_phone),
        url = COALESCE(?, url),
        cost = COALESCE(?, cost)
      WHERE id = ?
    `;

    // queryParams 배열에 새 값이 없을 경우 NULL을 할당
    let queryParams = [
      title !== undefined ? title : null,
      content !== undefined ? content : null,
      division !== undefined ? division : null,
      manager_department !== undefined ? manager_department : null,
      manager_phone !== undefined ? manager_phone : null,
      url !== undefined ? url : null,
      cost !== undefined ? cost : null,
      id,
    ];

    return await appDataSource.query(query, queryParams);
  } catch (error) {
    console.log(error);
    throw new CustomException(DATABASE_ERROR);
  }
};

module.exports = {
  getAllposts,
  updatePost,
};
