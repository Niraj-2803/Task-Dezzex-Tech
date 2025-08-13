const pool = require("../../config/db");

// Database operations for cases

exports.createCase = async (caseData) => {
  const {
    caseTitle,
    caseNumber,
    caseType,
    jurisdiction,
    priority,
    fillingDate,
    caseDescription,
    clientId,
    clientName,
    clientCompany,
    clientEmail,
    clientPhone,
    clientAddress,
    opposingParty,
    opposingCounsel,
    estimatedCaseValue,
    status,
  } = caseData;

  const [result] = await pool.query(
    `INSERT INTO cases
    (caseTitle, caseNumber, caseType, jurisdiction, priority, fillingDate, caseDescription, clientId, clientName, clientCompany, clientEmail, clientPhone, clientAddress, opposingParty, opposingCounsel, estimatedCaseValue, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      caseTitle,
      caseNumber,
      caseType,
      jurisdiction,
      priority,
      fillingDate,
      caseDescription,
      clientId || null,
      clientName || null,
      clientCompany || null,
      clientEmail || null,
      clientPhone || null,
      clientAddress || null,
      opposingParty || null,
      opposingCounsel || null,
      estimatedCaseValue || null,
      status,
    ]
  );

  return result.insertId;
};

exports.createByClientId = async (caseData) => {
  const {
    clientId,
    caseTitle,
    caseNumber,
    caseType,
    jurisdiction,
    priority,
    fillingDate,
    caseDescription,
    additionalDetails = {},
    lawyers = [],
    status = "active",
  } = caseData;

  const sql = `
    INSERT INTO cases
    (clientId, caseTitle, caseNumber, caseType, jurisdiction, priority, fillingDate, caseDescription,
     opposingParty, opposingCounsel, estimatedCaseValue, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    clientId,
    caseTitle,
    caseNumber,
    caseType,
    jurisdiction,
    priority,
    fillingDate,
    caseDescription,
    additionalDetails.opposingParty || null,
    additionalDetails.opposingCounsel || null,
    additionalDetails.estimatedCaseValue || null,
    status,
  ];

  const [result] = await pool.query(sql, params);

  return result.insertId;
};

exports.addLawyersToCase = async (caseId, lawyers) => {
  if (!Array.isArray(lawyers) || lawyers.length === 0) return;
  const values = lawyers.map((lawyerId) => [caseId, lawyerId]);
  await pool.query(`INSERT INTO case_lawyers (caseId, lawyerId) VALUES ?`, [values]);
};

exports.getAllCases = async (filters = {}, pagination = {}) => {
  let query = "SELECT * FROM cases WHERE 1=1";
  const params = [];

  if (filters.caseTitle) {
    query += " AND caseTitle LIKE ?";
    params.push(`%${filters.caseTitle}%`);
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

exports.getCaseById = async (id) => {
  const [[caseData]] = await pool.query("SELECT * FROM cases WHERE id = ?", [id]);
  if (!caseData) return null;

  // Get lawyers
  const [lawyers] = await pool.query(
    `SELECT l.id, l.firstName, l.lastName FROM case_lawyers cl
     JOIN lawyers l ON cl.lawyerId = l.id WHERE cl.caseId = ?`,
    [id]
  );

  return {
    ...caseData,
    lawyers,
  };
};

exports.updateCaseById = async (id, updateData) => {
  const fields = [];
  const params = [];

  for (const key in updateData) {
    fields.push(`${key} = ?`);
    params.push(updateData[key]);
  }
  params.push(id);

  if (fields.length === 0) return false;

  const sql = `UPDATE cases SET ${fields.join(", ")} WHERE id = ?`;
  const [result] = await pool.query(sql, params);
  return result.affectedRows > 0;
};

exports.deleteCaseById = async (id) => {
  const [result] = await pool.query("DELETE FROM cases WHERE id = ?", [id]);
  return result.affectedRows > 0;
};