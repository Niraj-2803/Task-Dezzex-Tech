const Joi = require("joi");

const createCaseSchema = Joi.object({
  caseTitle: Joi.string().required(),
  caseNumber: Joi.number().integer().required(),
  caseType: Joi.string().required(),
  jurisdiction: Joi.string().required(),
  priority: Joi.string().required(),
  fillingDate: Joi.date().required(),
  caseDescription: Joi.string().allow(null, ""),
  clientId: Joi.number().integer().optional(),
  clientName: Joi.string().when("clientId", { is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required() }),
  clientCompany: Joi.string().allow(null, ""),
  clientEmail: Joi.string().email().when("clientId", { is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required() }),
  clientPhone: Joi.string().when("clientId", { is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required() }),
  clientAddress: Joi.string().allow(null, ""),
  opposingParty: Joi.string().allow(null, ""),
  opposingCounsel: Joi.string().allow(null, ""),
  estimatedCaseValue: Joi.number().precision(2).allow(null),
  lawyers: Joi.array().items(Joi.number().integer()).optional(),
  status: Joi.string().valid("open", "closed", "pending").default("open"),
});

const updateCaseSchema = Joi.object({
  caseTitle: Joi.string().optional(),
  caseType: Joi.string().optional(),
  jurisdiction: Joi.string().optional(),
  priority: Joi.string().optional(),
  fillingDate: Joi.date().optional(),
  caseDescription: Joi.string().allow(null, "").optional(),
  clientId: Joi.number().integer().optional(),
  clientName: Joi.string().optional(),
  clientCompany: Joi.string().allow(null, "").optional(),
  clientEmail: Joi.string().email().optional(),
  clientPhone: Joi.string().optional(),
  clientAddress: Joi.string().allow(null, "").optional(),
  opposingParty: Joi.string().allow(null, "").optional(),
  opposingCounsel: Joi.string().allow(null, "").optional(),
  estimatedCaseValue: Joi.number().precision(2).allow(null).optional(),
  status: Joi.string().valid("open", "closed", "pending").optional(),
});

const addCommentSchema = Joi.object({
  comment: Joi.string().required(),
});

const addNoteSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

const addLawyerSchema = Joi.object({
  lawyerId: Joi.number().integer().required(),
});

module.exports = {
  createCaseSchema,
  updateCaseSchema,
  addCommentSchema,
  addNoteSchema,
  addLawyerSchema,
};
