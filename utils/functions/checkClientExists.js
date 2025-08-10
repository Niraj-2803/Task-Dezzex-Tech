const pool = require("../../config/db");

async function checkClientExists(clientId) {
  if (!clientId) return false;
  const [rows] = await pool.query("SELECT id FROM clients WHERE id = ?", [clientId]);
  return rows.length > 0;
}

module.exports = { checkClientExists };
