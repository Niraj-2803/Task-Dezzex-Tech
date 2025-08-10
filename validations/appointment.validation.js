const Joi = require("joi");

// Validation schema for appointment creation - Common Logic so it can be reused
const appointmentSchema = Joi.object({
  clientName: Joi.string().required(),
  duration: Joi.string().required(),
  dateTime: Joi.date().iso().required(),
  bookedOn: Joi.date().iso().required(),
  lawyer_id: Joi.number().integer().positive().required(),
});

const appointmentFields = ["clientName", "duration", "dateTime", "bookedOn", "lawyer_id"];

function pickAppointmentFields(body) {
  return appointmentFields.reduce((obj, key) => {
    if (body[key] !== undefined) obj[key] = body[key];
    return obj;
  }, {});
}

module.exports = {
  appointmentSchema,
  pickAppointmentFields,
};