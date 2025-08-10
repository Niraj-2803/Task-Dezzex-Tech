const pool = require("../config/db");
const { toMySQLDateTime } = require("../utils/functions/dateFormatter");

const { appointmentSchema, pickAppointmentFields } = require("../validations/appointment.validation");

// Create appointment with validation logic applied in controller, here just DB logic
exports.create = async (appointment) => {
  const { clientName, duration, dateTime, bookedOn, lawyer_id } = appointment;

  const formattedDateTime = toMySQLDateTime(dateTime);
  const formattedBookedOn = toMySQLDateTime(bookedOn);

  const [result] = await pool.query(
    `INSERT INTO appointments (clientName, duration, dateTime, bookedOn, lawyer_id)
     VALUES (?, ?, ?, ?, ?)`,
    [clientName, duration, formattedDateTime, formattedBookedOn, lawyer_id]
  );

  return result.insertId;
};

// Find appointments with filters
exports.findAll = async (filters = {}, pagination = {}) => {
  let query = `
    SELECT *,
    CONCAT('A', LPAD(id, 3, '0')) as customId
    FROM appointments
    WHERE 1=1
  `;
  const params = [];

  if (filters.clientName) {
    query += " AND clientName LIKE ?";
    params.push(`%${filters.clientName}%`);
  }

  if (filters.date) {
    query += " AND DATE(dateTime) = ?";
    params.push(filters.date);
  }

  if (filters.lawyer_id) {
    query += " AND lawyer_id = ?";
    params.push(filters.lawyer_id);
  }

  const { limit, offset } = pagination;
  if (limit) {
    query += " LIMIT ?";
    params.push(Number(limit));
  }
  if (offset) {
    query += " OFFSET ?";
    params.push(Number(offset));
  }

  const [rows] = await pool.query(query, params);
  return rows;
};