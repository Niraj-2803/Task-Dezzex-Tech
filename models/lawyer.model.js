const pool = require("../config/db");
const { safeJsonParse, toJsonString } = require("../utils/functions/jsonHelper");

const ARRAY_FIELDS = [
  "languages",
  "practiceAreas",
  "consultantAvailability",
  "timing",
];

// Database operations for lawyers

exports.create = async (lawyer) => {
  const {
    firstName,
    lastName,
    mobile,
    email,
    country,
    yearsOfExperience,
    languages,
    lawyerType,
    about,
    practiceAreas,
    consultantAvailability,
    timing,
  } = lawyer;

  const [result] = await pool.query(
    `INSERT INTO lawyers
    (firstName, lastName, mobile, email, country, yearsOfExperience, languages, lawyerType, about, practiceAreas, consultantAvailability, timing)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      firstName,
      lastName,
      mobile,
      email,
      country,
      yearsOfExperience,
      toJsonString(languages),
      lawyerType,
      about || null,
      toJsonString(practiceAreas),
      toJsonString(consultantAvailability),
      toJsonString(timing),
    ]
  );

  return result.insertId;
};

// Find lawyers with filters
exports.findAll = async (filters = {}, pagination = {}) => {
  let query = `
    SELECT *, CONCAT(firstName, ' ', lastName) AS fullName
    FROM lawyers
    WHERE 1=1
  `;
  const params = [];

  if (filters.name) {
    query += ` AND (firstName LIKE ? OR lastName LIKE ?)`;
    params.push(`%${filters.name}%`, `%${filters.name}%`);
  }
  if (filters.lawyerType) {
    query += ` AND lawyerType = ?`;
    params.push(filters.lawyerType);
  }
  if (filters.country) {
    query += ` AND country = ?`;
    params.push(filters.country);
  }
  if (filters.minExperience !== undefined) {
    query += ` AND yearsOfExperience >= ?`;
    params.push(Number(filters.minExperience));
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

  return rows.map((row) => ({
    ...row,
    languages: safeJsonParse(row.languages),
    practiceAreas: safeJsonParse(row.practiceAreas),
    consultantAvailability: safeJsonParse(row.consultantAvailability),
    timing: safeJsonParse(row.timing),
  }));
};

exports.updateById = async (id, updateData) => {
  if (!id || isNaN(Number(id))) return false;

  const fields = [];
  const params = [];

  for (const key in updateData) {
    let val = updateData[key];
    if (ARRAY_FIELDS.includes(key)) val = toJsonString(val);

    fields.push(`${key} = ?`);
    params.push(val);
  }
  params.push(id);

  if (fields.length === 0) return false;

  const sql = `UPDATE lawyers SET ${fields.join(", ")} WHERE id = ?`;

  const [result] = await pool.query(sql, params);

  return result.affectedRows > 0;
};

exports.deleteById = async (id) => {
  if (!id || isNaN(Number(id))) return false;

  const [result] = await pool.query(`DELETE FROM lawyers WHERE id = ?`, [id]);
  return result.affectedRows > 0;
};