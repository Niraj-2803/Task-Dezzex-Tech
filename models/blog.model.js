const pool = require("../config/db");

exports.create = async (blog) => {
  const {
    image,
    name,
    law_type,
    title,
    brief,
    createdOn,
    isPosted,
  } = blog;

  const [result] = await pool.query(
    `INSERT INTO blogs
     (image, name, law_type, title, brief, createdOn, isPosted)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [image, name, law_type, title, brief, createdOn, isPosted ? 1 : 0]
  );

  return result.insertId;
};

exports.findAll = async (filters = {}, pagination = {}) => {
  let query = `SELECT *, CASE WHEN isPosted=1 THEN 'Posted' ELSE 'Draft' END AS status FROM blogs WHERE 1=1`;
  const params = [];

  if (filters.title) {
    query += ` AND title LIKE ?`;
    params.push(`%${filters.title}%`);
  }

  if (pagination.limit) {
    query += " LIMIT ?";
    params.push(Number(pagination.limit));
  }
  if (pagination.offset) {
    query += " OFFSET ?";
    params.push(Number(pagination.offset));
  }

  const [rows] = await pool.query(query, params);
  return rows;
};

exports.findById = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM blogs WHERE id = ?`, [id]);
  return rows.length ? rows[0] : null;
};

exports.updateById = async (id, updateData) => {
  const fields = [];
  const params = [];

  for (const key in updateData) {
    let val = updateData[key];
    if (key === "isPosted") val = val ? 1 : 0;

    fields.push(`${key} = ?`);
    params.push(val);
  }
  params.push(id);

  if (fields.length === 0) return false;

  const sql = `UPDATE blogs SET ${fields.join(", ")} WHERE id = ?`;
  const [result] = await pool.query(sql, params);

  return result.affectedRows > 0;
};

exports.deleteById = async (id) => {
  const [result] = await pool.query(`DELETE FROM blogs WHERE id = ?`, [id]);
  return result.affectedRows > 0;
};