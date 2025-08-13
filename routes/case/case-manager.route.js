const express = require("express");
const router = express.Router();
const CaseManagerController = require("../../controllers/case/case-manager.controller");

/**
 * @swagger
 * tags:
 *   name: CaseManager
 *   description: Manage case comments, notes, team, files
 */

/**
 * @swagger
 * /api/cases/manager/{id}/comments:
 *   post:
 *     summary: Add comment to a case
 *     tags: [CaseManager]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Case ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment
 *             properties:
 *               comment:
 *                 type: string
 *                 example: "This is a comment."
 *     responses:
 *       200:
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Comment added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     commentId:
 *                       type: integer
 *                       example: 123
 *       400:
 *         description: Validation error
 *       404:
 *         description: Case not found
 *       500:
 *         description: Internal server error
 */
router.post("/:id/comments", CaseManagerController.addComment);

/**
 * @swagger
 * /api/cases/manager/{id}/comments:
 *   get:
 *     summary: Get comments for a case
 *     tags: [CaseManager]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Case ID
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   commentId:
 *                     type: integer
 *                     example: 123
 *                   caseId:
 *                     type: integer
 *                     example: 456
 *                   comment:
 *                     type: string
 *                     example: "This is a comment."
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-08-10T14:48:00.000Z"
 *       500:
 *         description: Internal server error
 */
router.get("/:id/comments", CaseManagerController.getComments);

/**
 * @swagger
 * /api/cases/manager/{id}/notes:
 *   post:
 *     summary: Add note to a case
 *     tags: [CaseManager]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Case ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Important Note"
 *               description:
 *                 type: string
 *                 example: "Note details go here."
 *     responses:
 *       200:
 *         description: Note added successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Case not found
 *       500:
 *         description: Internal server error
 */
router.post("/:id/notes", CaseManagerController.addNote);

/**
 * @swagger
 * /api/cases/manager/{id}/notes:
 *   get:
 *     summary: Get notes for a case
 *     tags: [CaseManager]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Case ID
 *     responses:
 *       200:
 *         description: List of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   noteId:
 *                     type: integer
 *                     example: 789
 *                   caseId:
 *                     type: integer
 *                     example: 456
 *                   title:
 *                     type: string
 *                     example: "Important Note"
 *                   description:
 *                     type: string
 *                     example: "Note details go here."
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-08-10T14:48:00.000Z"
 *       500:
 *         description: Internal server error
 */
router.get("/:id/notes", CaseManagerController.getNotes);

/**
 * @swagger
 * /api/cases/manager/{id}/lawyers:
 *   post:
 *     summary: Add lawyer to case team
 *     tags: [CaseManager]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Case ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lawyerId
 *               - name
 *             properties:
 *               lawyerId:
 *                 type: integer
 *                 example: 345
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *     responses:
 *       200:
 *         description: Lawyer added successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Case or lawyer not found
 *       500:
 *         description: Internal server error
 */
router.post("/:id/lawyers", CaseManagerController.addLawyer);

/**
 * @swagger
 * /api/cases/manager/{id}/lawyers:
 *   get:
 *     summary: Get all lawyers on case team
 *     tags: [CaseManager]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Case ID
 *     responses:
 *       200:
 *         description: List of lawyers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   lawyerId:
 *                     type: integer
 *                     example: 345
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *       500:
 *         description: Internal server error
 */
router.get("/:id/lawyers", CaseManagerController.getTeamLawyers);

/**
 * @swagger
 * /api/cases/manager/{id}/lawyers/{lawyerId}:
 *   delete:
 *     summary: Remove lawyer from case team
 *     tags: [CaseManager]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Case ID
 *       - in: path
 *         name: lawyerId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Lawyer ID
 *     responses:
 *       200:
 *         description: Lawyer removed successfully
 *       404:
 *         description: Case or lawyer not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id/lawyers/:lawyerId", CaseManagerController.removeLawyer);

/**
 * @swagger
 * /api/cases/manager/{id}/files:
 *   post:
 *     summary: Upload file to case
 *     tags: [CaseManager]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Case ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: Validation error or no file uploaded
 *       404:
 *         description: Case not found
 *       500:
 *         description: Internal server error
 */
router.post("/:id/files", CaseManagerController.addFile);

/**
 * @swagger
 * /api/cases/manager/{id}/files:
 *   get:
 *     summary: Get files for a case
 *     tags: [CaseManager]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Case ID
 *     responses:
 *       200:
 *         description: List of files
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   fileId:
 *                     type: integer
 *                     example: 678
 *                   caseId:
 *                     type: integer
 *                     example: 456
 *                   filename:
 *                     type: string
 *                     example: "document.pdf"
 *                   url:
 *                     type: string
 *                     example: "https://example.com/files/document.pdf"
 *                   uploadedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-08-10T14:48:00.000Z"
 *       500:
 *         description: Internal server error
 */
router.get("/:id/files", CaseManagerController.getFiles);

module.exports = router;
