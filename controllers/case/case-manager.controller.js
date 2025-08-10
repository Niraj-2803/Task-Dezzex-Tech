const CaseManagerModel = require("../../models/case/case-manager.model");
const {
  addCommentSchema,
  addNoteSchema,
  addLawyerSchema,
} = require("../../validations/case.validation");
const { error, success } = require("../../utils/functions/response");

// Add a comment to a case
exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { error: validationError, value } = addCommentSchema.validate(
      req.body
    );
    if (validationError)
      return error(res, validationError.details[0].message, 400);

    const commentId = await CaseManagerModel.addComment(id, value.comment);
    if (!commentId) return error(res, "Case not found", 404);

    return success(res, { commentId }, "Comment added successfully");
  } catch (err) {
    console.error("Error in addComment:", err);
    return error(res, "Internal server error", 500);
  }
};

// Get all comments of a case
exports.getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await CaseManagerModel.getComments(id);
    return success(res, comments, "Comments fetched successfully");
  } catch (err) {
    console.error("Error in getComments:", err);
    return error(res, "Internal server error", 500);
  }
};

// Add a note to a case
exports.addNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { error: validationError, value } = addNoteSchema.validate(req.body);
    if (validationError)
      return error(res, validationError.details[0].message, 400);

    const noteId = await CaseManagerModel.addNote(
      id,
      value.title,
      value.description
    );
    if (!noteId) return error(res, "Case not found", 404);

    return success(res, { noteId }, "Note added successfully");
  } catch (err) {
    console.error("Error in addNote:", err);
    return error(res, "Internal server error", 500);
  }
};

// Get all notes of a case
exports.getNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const notes = await CaseManagerModel.getNotes(id);
    return success(res, notes, "Notes fetched successfully");
  } catch (err) {
    console.error("Error in getNotes:", err);
    return error(res, "Internal server error", 500);
  }
};

// Add a lawyer to the case team
exports.addLawyer = async (req, res) => {
  try {
    const { id } = req.params;
    const { error: validationError, value } = addLawyerSchema.validate(
      req.body
    );
    if (validationError)
      return error(res, validationError.details[0].message, 400);

    const addedId = await CaseManagerModel.addLawyer(id, value.lawyerId);
    if (!addedId) return error(res, "Case or lawyer not found", 404);

    return success(res, { addedId }, "Lawyer added successfully");
  } catch (err) {
    console.error("Error in addLawyer:", err);
    return error(res, "Internal server error", 500);
  }
};

// Remove a lawyer from the case team
exports.removeLawyer = async (req, res) => {
  try {
    const { id, lawyerId } = req.params;
    const removed = await CaseManagerModel.removeLawyer(id, lawyerId);
    if (!removed) return error(res, "Case or lawyer not found", 404);

    return success(res, null, "Lawyer removed successfully");
  } catch (err) {
    console.error("Error in removeLawyer:", err);
    return error(res, "Internal server error", 500);
  }
};

// Get all lawyers of the case team
exports.getTeamLawyers = async (req, res) => {
  try {
    const { id } = req.params;
    const lawyers = await CaseManagerModel.getTeamLawyers(id);
    return success(res, lawyers, "Team lawyers fetched successfully");
  } catch (err) {
    console.error("Error in getTeamLawyers:", err);
    return error(res, "Internal server error", 500);
  }
};

// Upload file to case
exports.addFile = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file) return error(res, "No file uploaded", 400);

    const { filename, path } = req.file; // Assuming middleware like multer
    const fileId = await CaseManagerModel.addFile(id, filename, path);

    if (!fileId) return error(res, "Case not found", 404);

    return success(res, { fileId }, "File uploaded successfully");
  } catch (err) {
    console.error("Error in addFile:", err);
    return error(res, "Internal server error", 500);
  }
};

// Get all files for a case
exports.getFiles = async (req, res) => {
  try {
    const { id } = req.params;
    const files = await CaseManagerModel.getFiles(id);
    return success(res, files, "Files fetched successfully");
  } catch (err) {
    console.error("Error in getFiles:", err);
    return error(res, "Internal server error", 500);
  }
};
