const Appointment = require("../models/appointment.model");
const { success, error } = require("../utils/functions/response");
const { appointmentSchema } = require("../validations/appointment.validation");

// Create Appointment - Book an appointment
exports.createAppointment = async (req, res) => {
  try {
    const { error: validationError, value } = appointmentSchema.validate(
      req.body,
      {
        abortEarly: false,
        stripUnknown: true,
      }
    );

    if (validationError) {
      const message = validationError.details.map((d) => d.message).join(", ");
      return error(res, `Validation error: ${message}`, 400);
    }

    const id = await Appointment.create(value);
    return success(res, { id }, "Appointment created successfully");
  } catch (err) {
    console.error("Error in createAppointment:", err);
    return error(res, "Internal server error", 500);
  }
};

// Get all appointments with filters + pagination
exports.getAppointments = async (req, res) => {
  try {
    const { clientName, date, lawyer_id, page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;
    const filters = { clientName, date, lawyer_id };

    const data = await Appointment.findAll(filters, { limit, offset });

    return success(res, data, "Appointments fetched successfully");
  } catch (err) {
    console.error("Error in getAppointments:", err);
    return error(res, "Internal server error", 500);
  }
};

// Get appointments by lawyer ID - for a specific lawyer
exports.getAppointmentsByLawyerId = async (req, res) => {
  try {
    const { lawyer_id } = req.params;

    if (!lawyer_id) {
      return error(res, "lawyer_id parameter is required", 400);
    }

    const data = await Appointment.findAll(
      { lawyer_id },
      { limit: 1000, offset: 0 }
    );

    return success(
      res,
      data,
      `Appointments for lawyer_id ${lawyer_id} fetched successfully`
    );
  } catch (err) {
    console.error("Error in getAppointmentsByLawyerId:", err);
    return error(res, "Internal server error", 500);
  }
};
