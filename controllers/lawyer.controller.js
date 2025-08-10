const Lawyer = require("../models/lawyer.model");
const { success, error } = require("../utils/functions/response");
const {
  lawyerSchema,
  pickLawyerFields,
} = require("../validations/lawyer.validation");

// Create Lawyer
exports.createLawyer = async (req, res) => {
  try {
    const { error: validationError, value } = lawyerSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (validationError) {
      const message = validationError.details.map((d) => d.message).join(", ");
      return error(res, `Validation error: ${message}`, 400);
    }

    const id = await Lawyer.create(value);
    return success(res, { id }, "Lawyer created successfully");
  } catch (err) {
    console.error("Error in createLawyer:", err);
    return error(res, "Internal server error", 500);
  }
};

// Get Lawyers with filters + pagination
exports.getLawyers = async (req, res) => {
  try {
    const {
      name,
      lawyerType,
      country,
      minExperience,
      page = 1,
      limit = 10,
    } = req.query;

    const offset = (page - 1) * limit;
    const filters = { name, lawyerType, country, minExperience };

    const lawyers = await Lawyer.findAll(filters, { limit, offset });
    return success(res, lawyers, "Lawyers fetched successfully");
  } catch (err) {
    console.error("Error in getLawyers:", err);
    return error(res, "Internal server error", 500);
  }
};

// Update Lawyer
exports.updateLawyer = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = pickLawyerFields(req.body);

    if (Object.keys(updateData).length === 0) {
      return error(res, "No valid fields provided for update", 400);
    }

    const updated = await Lawyer.updateById(id, updateData);

    if (!updated) {
      return error(res, "Lawyer not found or no changes made", 404);
    }

    return success(res, null, "Lawyer updated successfully");
  } catch (err) {
    console.error("Error in updateLawyer:", err);
    return error(res, "Internal server error", 500);
  }
};

// Delete Lawyer
exports.deleteLawyer = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Lawyer.deleteById(id);

    if (!deleted) {
      return error(res, "Lawyer not found", 404);
    }

    return success(res, null, "Lawyer deleted successfully");
  } catch (err) {
    console.error("Error in deleteLawyer:", err);
    return error(res, "Internal server error", 500);
  }
};
