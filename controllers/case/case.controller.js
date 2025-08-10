const CaseModel = require("../../models/case/case.model");
const {
  createCaseSchema,
  updateCaseSchema,
} = require("../../validations/case.validation");
const { error, success } = require("../../utils/functions/response");
const {
  checkClientExists,
} = require("../../utils/functions/checkClientExists");

exports.createCase = async (req, res) => {
  try {
    const { error: validationError, value } = createCaseSchema.validate(
      req.body
    );
    if (validationError)
      return error(res, validationError.details[0].message, 400);

    const { lawyers = [], ...caseData } = value;

    const caseId = await CaseModel.createCase(caseData);

    if (lawyers.length > 0) {
      await CaseModel.addLawyersToCase(caseId, lawyers);
    }

    return success(
      res,
      { caseId, caseNumber: caseData.caseNumber },
      "Case created successfully"
    );
  } catch (err) {
    console.error("Error in createCase:", err);
    return error(res, "Internal server error", 500);
  }
};

exports.createCaseByClientId = async (req, res) => {
  try {
    const {
      clientId,
      caseTitle,
      caseNumberInput,
      caseType,
      jurisdiction,
      priority,
      fillingDate,
      caseDescription,
      additionalDetails = {},
      lawyers = [],
      status = "active",
    } = req.body;

    if (
      !clientId ||
      !caseTitle ||
      !caseNumberInput ||
      !caseType ||
      !jurisdiction ||
      !priority ||
      !fillingDate ||
      !caseDescription
    ) {
      return error(res, "Missing required fields", 400);
    }

    const clientExists = await checkClientExists(clientId);
    if (!clientExists) {
      return error(res, "Client not found", 404);
    }

    const caseNumber = generateCaseNumber(caseNumberInput);

    const caseId = await CaseModel.createByClientId({
      clientId,
      caseTitle,
      caseNumber,
      caseType,
      jurisdiction,
      priority,
      fillingDate,
      caseDescription,
      additionalDetails,
      lawyers,
      status,
    });

    if (lawyers.length > 0) {
      await CaseModel.addLawyersToCase(caseId, lawyers);
    }

    return success(
      res,
      { caseId, caseNumber },
      "Case created successfully linked to client"
    );
  } catch (err) {
    console.error("Error in createCaseByClientId:", err);
    return error(res, "Internal server error", 500);
  }
};

exports.getAllCases = async (req, res) => {
  try {
    const { caseTitle, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const cases = await CaseModel.getAllCases({ caseTitle }, { limit, offset });

    return success(res, cases, "Cases fetched successfully");
  } catch (err) {
    console.error("Error in getAllCases:", err);
    return error(res, "Internal server error", 500);
  }
};

exports.getCaseById = async (req, res) => {
  try {
    const { id } = req.params;

    const caseData = await CaseModel.getCaseById(id);
    if (!caseData) return error(res, "Case not found", 404);

    return success(res, caseData, "Case fetched successfully");
  } catch (err) {
    console.error("Error in getCaseById:", err);
    return error(res, "Internal server error", 500);
  }
};

exports.updateCase = async (req, res) => {
  try {
    const { id } = req.params;
    const { error: validationError, value } = updateCaseSchema.validate(
      req.body
    );
    if (validationError)
      return error(res, validationError.details[0].message, 400);

    const updated = await CaseModel.updateCaseById(id, value);
    if (!updated) return error(res, "Case not found or no changes made", 404);

    return success(res, null, "Case updated successfully");
  } catch (err) {
    console.error("Error in updateCase:", err);
    return error(res, "Internal server error", 500);
  }
};

exports.deleteCase = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CaseModel.deleteCaseById(id);
    if (!deleted) return error(res, "Case not found", 404);

    return success(res, null, "Case deleted successfully");
  } catch (err) {
    console.error("Error in deleteCase:", err);
    return error(res, "Internal server error", 500);
  }
};
