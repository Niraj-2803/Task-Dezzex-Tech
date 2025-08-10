const pool = require("../config/db");

exports.create = async (client) => {
  const {
    clientType,
    firstName,
    lastName,
    email,
    phoneNumber,
    altPhoneNumber,
    website,
    streetAddress,
    city,
    state,
    zipCode,
    country,
    assignedLawyer,
    priority,
    billed,
    notes,
    status = "active", // default keeping active on create
  } = client;

  const [result] = await pool.query(
    `INSERT INTO clients
    (clientType, firstName, lastName, email, phoneNumber, altPhoneNumber, website,
     streetAddress, city, state, zipCode, country,
     assignedLawyer, priority, billed, notes, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      clientType,
      firstName,
      lastName,
      email,
      phoneNumber,
      altPhoneNumber || null,
      website || null,
      streetAddress,
      city,
      state,
      zipCode,
      country,
      assignedLawyer,
      priority,
      billed,
      notes || null,
      status,
    ]
  );

  return result.insertId;
};

exports.findAll = async (filters = {}, pagination = {}) => {
  let query = `
    SELECT * FROM clients WHERE 1=1
  `;
  const params = [];

  if (filters.name) {
    query += ` AND (firstName LIKE ? OR lastName LIKE ?)`;
    params.push(`%${filters.name}%`, `%${filters.name}%`);
  }

  if (filters.status) {
    query += ` AND status = ?`;
    params.push(filters.status);
  }

  if (pagination.limit) {
    query += ` LIMIT ?`;
    params.push(Number(pagination.limit));
  }

  if (pagination.offset) {
    query += ` OFFSET ?`;
    params.push(Number(pagination.offset));
  }

  const [rows] = await pool.query(query, params);
  return rows;
};

exports.findById = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM clients WHERE id = ?`, [id]);
  if (rows.length === 0) return null;
  return rows[0];
};

exports.updateById = async (id, updateData) => {
  const fields = [];
  const params = [];

  for (const key in updateData) {
    fields.push(`${key} = ?`);
    params.push(updateData[key]);
  }
  params.push(id);

  if (fields.length === 0) return false;

  const sql = `UPDATE clients SET ${fields.join(", ")} WHERE id = ?`;

  const [result] = await pool.query(sql, params);
  return result.affectedRows > 0;
};

exports.deleteById = async (id) => {
  const [result] = await pool.query(`DELETE FROM clients WHERE id = ?`, [id]);
  return result.affectedRows > 0;
};