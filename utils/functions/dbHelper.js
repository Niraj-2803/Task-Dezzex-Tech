const pool = require("../../config/db");

async function checkLawyerExists(lawyerId) {
  if (!lawyerId) return false;
  const [rows] = await pool.query("SELECT id FROM lawyers WHERE id = ?", [lawyerId]);
  return rows.length > 0;
}

module.exports = {
  checkLawyerExists,
};