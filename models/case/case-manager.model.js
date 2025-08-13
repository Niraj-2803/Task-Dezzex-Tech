const pool = require("../../config/db");

// Database operations for case management

exports.addComment = async (caseId, comment) => {
  const [result] = await pool.query(
    `INSERT INTO case_comments (caseId, comment) VALUES (?, ?)`,
    [caseId, comment]
  );
  return result.insertId;
};

exports.getComments = async (caseId) => {
  const [rows] = await pool.query(
    `SELECT * FROM case_comments WHERE caseId = ? ORDER BY createdAt DESC`,
    [caseId]
  );
  return rows;
};

exports.addNote = async (caseId, title, description) => {
  const [result] = await pool.query(
    `INSERT INTO case_notes (caseId, title, description) VALUES (?, ?, ?)`,
    [caseId, title, description]
  );
  return result.insertId;
};

exports.getNotes = async (caseId) => {
  const [rows] = await pool.query(
    `SELECT * FROM case_notes WHERE caseId = ? ORDER BY createdAt DESC`,
    [caseId]
  );
  return rows;
};

exports.addLawyer = async (caseId, lawyerId) => {
  const [result] = await pool.query(
    `INSERT INTO case_lawyers (caseId, lawyerId) VALUES (?, ?)`,
    [caseId, lawyerId]
  );
  return result.insertId;
};

exports.removeLawyer = async (caseId, lawyerId) => {
  const [result] = await pool.query(
    `DELETE FROM case_lawyers WHERE caseId = ? AND lawyerId = ?`,
    [caseId, lawyerId]
  );
  return result.affectedRows > 0;
};

exports.getTeamLawyers = async (caseId) => {
  const [rows] = await pool.query(
    `SELECT l.id, l.firstName, l.lastName FROM case_lawyers cl
     JOIN lawyers l ON cl.lawyerId = l.id WHERE cl.caseId = ?`,
    [caseId]
  );
  return rows;
};

exports.addFile = async (caseId, fileName, filePath) => {
  const [result] = await pool.query(
    `INSERT INTO case_files (caseId, fileName, filePath) VALUES (?, ?, ?)`,
    [caseId, fileName, filePath]
  );
  return result.insertId;
};

exports.getFiles = async (caseId) => {
  const [rows] = await pool.query(
    `SELECT * FROM case_files WHERE caseId = ? ORDER BY uploadedAt DESC`,
    [caseId]
  );
  return rows;
};