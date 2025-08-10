const Joi = require("joi");

// Validation schema for lawyer creation - Common Logic so it can be reused
const lawyerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  mobile: Joi.string().required(),
  email: Joi.string().email().required(),
  country: Joi.string().required(),
  yearsOfExperience: Joi.number().integer().min(0).required(),
  languages: Joi.array().items(Joi.string()).required(),
  lawyerType: Joi.string().required(),
  about: Joi.string().optional(),
  practiceAreas: Joi.array().items(Joi.string()).required(),
  consultantAvailability: Joi.array().items(Joi.string()).required(),
  timing: Joi.array().items(Joi.string()).required(),
});

const lawyerFields = [
  "firstName",
  "lastName",
  "mobile",
  "email",
  "country",
  "yearsOfExperience",
  "languages",
  "lawyerType",
  "about",
  "practiceAreas",
  "consultantAvailability",
  "timing",
];

function pickLawyerFields(body) {
  return lawyerFields.reduce((obj, key) => {
    if (body[key] !== undefined) obj[key] = body[key];
    return obj;
  }, {});
}

module.exports = {
  lawyerSchema,
  pickLawyerFields,
};