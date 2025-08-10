const Client = require("../models/client.model");
const { success, error } = require("../utils/functions/response");
const { checkLawyerExists } = require("../utils/functions/dbHelper");
const {
  clientSchema,
  pickClientFields,
} = require("../validations/client.validation");

exports.createClient = async (req, res) => {
  try {
    const { error: validationError, value } = clientSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (validationError) {
      const message = validationError.details.map((d) => d.message).join(", ");
      return error(res, `Validation error: ${message}`, 400);
    }

    // Checking if assigned lawyer exists - assuming client will select a lawyer
    const lawyerExists = await checkLawyerExists(clientSchema.assignedLawyer);
    if (!lawyerExists) {
      return res
        .status(400)
        .json({ status: false, message: "Assigned lawyer does not exist" });
    }

    const id = await Client.create(value);
    return success(res, { id }, "Client created successfully");
  } catch (err) {
    console.error("Error in createClient:", err);
    return error(res, "Internal server error", 500);
  }
};

exports.getClients = async (req, res) => {
  try {
    const { name, status, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const filters = { name, status };
    const clients = await Client.findAll(filters, { limit, offset });
    return success(res, clients, "Clients fetched successfully");
  } catch (err) {
    console.error("Error in getClients:", err);
    return error(res, "Internal server error", 500);
  }
};

exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = pickClientFields(req.body);

    if (Object.keys(updateData).length === 0) {
      return error(res, "No valid fields provided for update", 400);
    }

    if (updateData.assignedLawyer !== undefined) {
      const exists = await checkLawyerExists(updateData.assignedLawyer);
      if (!exists) {
        return error(
          res,
          `Assigned lawyer with id ${updateData.assignedLawyer} does not exist`,
          400
        );
      }
    }

    const updated = await Client.updateById(id, updateData);
    if (!updated) {
      return error(res, "Client not found or no changes made", 404);
    }

    return success(res, null, "Client updated successfully");
  } catch (err) {
    console.error("Error in updateClient:", err);
    return error(res, "Internal server error", 500);
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Client.deleteById(id);
    if (!deleted) {
      return error(res, "Client not found", 404);
    }
    return success(res, null, "Client deleted successfully");
  } catch (err) {
    console.error("Error in deleteClient:", err);
    return error(res, "Internal server error", 500);
  }
};
