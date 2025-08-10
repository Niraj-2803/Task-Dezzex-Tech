const Joi = require("joi");

const clientSchema = Joi.object({
  clientType: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  altPhoneNumber: Joi.string().optional().allow(""),
  website: Joi.string().uri().optional().allow(""),

  // Address Info
  streetAddress: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zipCode: Joi.string().required(),
  country: Joi.string().required(),

  assignedLawyer: Joi.number().integer().required(), // Assuming lawyer id
  priority: Joi.string().valid("Low", "Medium", "High").required(),
  billed: Joi.boolean().required(),
  notes: Joi.string().optional().allow(""),

  status: Joi.string().valid("active", "inactive").optional(), // editable in update
});

const clientUpdateSchema = clientSchema.fork(Object.keys(clientSchema.describe().keys), (schema) => schema.optional());

const clientFields = [
  "clientType",
  "firstName",
  "lastName",
  "email",
  "phoneNumber",
  "altPhoneNumber",
  "website",
  "streetAddress",
  "city",
  "state",
  "zipCode",
  "country",
  "assignedLawyer",
  "priority",
  "billed",
  "notes",
  "status",
];

function pickClientFields(body) {
  return clientFields.reduce((obj, key) => {
    if (body[key] !== undefined) obj[key] = body[key];
    return obj;
  }, {});
}

module.exports = {
  clientSchema,
  clientUpdateSchema,
  pickClientFields,
};