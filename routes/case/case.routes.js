const express = require("express");
const router = express.Router();
const CaseController = require("../../controllers/case/case.controller");

/**
 * @swagger
 * tags:
 *   name: Cases
 *   description: Basic Case CRUD and listing
 */

/**
 * @swagger
 * /api/cases:
 *   post:
 *     summary: Create a new case
 *     tags: [Cases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - caseTitle
 *               - caseNumber
 *               - caseType
 *               - jurisdiction
 *               - priority
 *               - fillingDate
 *               - caseDescription
 *             properties:
 *               caseTitle:
 *                 type: string
 *               caseNumber:
 *                 type: number
 *                 description: Auto-generated format CASE-<input_number>
 *               caseType:
 *                 type: string
 *               jurisdiction:
 *                 type: string
 *               priority:
 *                 type: string
 *               fillingDate:
 *                 type: string
 *                 format: date
 *               caseDescription:
 *                 type: string
 *               clientId:
 *                 type: integer
 *                 description: Optional client ID if linked
 *               clientName:
 *                 type: string
 *                 description: Client name if no clientId provided
 *               clientCompany:
 *                 type: string
 *               clientEmail:
 *                 type: string
 *                 format: email
 *               clientPhone:
 *                 type: string
 *               clientAddress:
 *                 type: string
 *               opposingParty:
 *                 type: string
 *               opposingCounsel:
 *                 type: string
 *               estimatedCaseValue:
 *                 type: number
 *                 format: float
 *               lawyers:
 *                 type: array
 *                 items:
 *                   type: integer
 *               status:
 *                 type: string
 *                 enum: [open, closed, pending]
 *                 default: open
 *     responses:
 *       200:
 *         description: Case created successfully
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
 *                   example: Case created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Validation error or missing fields
 *       500:
 *         description: Internal server error
 */
router.post("/", CaseController.createCase);

/**
 * @swagger
 * /api/cases/client_id:
 *   post:
 *     summary: Create a case linked to existing client by client ID
 *     tags: [Cases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientId
 *               - caseTitle
 *               - caseNumber
 *               - caseType
 *               - jurisdiction
 *               - priority
 *               - fillingDate
 *               - caseDescription
 *             properties:
 *               clientId:
 *                 type: integer
 *               caseTitle:
 *                 type: string
 *               caseNumber:
 *                 type: string
 *                 description: Auto-generated format CASE-<input_number>
 *               caseType:
 *                 type: string
 *               jurisdiction:
 *                 type: string
 *               priority:
 *                 type: string
 *               fillingDate:
 *                 type: string
 *                 format: date
 *               caseDescription:
 *                 type: string
 *               opposingParty:
 *                 type: string
 *               opposingCounsel:
 *                 type: string
 *               estimatedCaseValue:
 *                 type: number
 *               lawyers:
 *                 type: array
 *                 items:
 *                   type: integer
 *               status:
 *                 type: string
 *                 enum: [active, closed, pending]
 *                 default: active
 *     responses:
 *       200:
 *         description: Case created successfully linked to client
 *       400:
 *         description: Validation error or missing fields
 *       404:
 *         description: Client not found
 *       500:
 *         description: Internal server error
 */
router.post("/client_id", CaseController.createCaseByClientId);

/**
 * @swagger
 * /api/cases:
 *   get:
 *     summary: Get all cases with optional filtering by title
 *     tags: [Cases]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter cases by title
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page
 *     responses:
 *       200:
 *         description: List of cases fetched successfully
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
 *                   example: Cases fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       caseTitle:
 *                         type: string
 *                         example: "Case ABC"
 *                       caseNumber:
 *                         type: string
 *                         example: "CASE-001"
 *                       caseType:
 *                         type: string
 *                         example: "Criminal"
 *                       jurisdiction:
 *                         type: string
 *                         example: "Mumbai"
 *                       priority:
 *                         type: string
 *                         example: "High"
 *                       fillingDate:
 *                         type: string
 *                         format: date
 *                         example: "2025-08-10"
 *                       caseDescription:
 *                         type: string
 *                         example: "Case description text..."
 *                       clientId:
 *                         type: integer
 *                       clientName:
 *                         type: string
 *                       clientCompany:
 *                         type: string
 *                       clientEmail:
 *                         type: string
 *                       clientPhone:
 *                         type: string
 *                       clientAddress:
 *                         type: string
 *                       opposingParty:
 *                         type: string
 *                       opposingCounsel:
 *                         type: string
 *                       estimatedCaseValue:
 *                         type: number
 *                       lawyers:
 *                         type: array
 *                         items:
 *                           type: integer
 *                       status:
 *                         type: string
 *                         example: "active"
 */
router.get("/", CaseController.getAllCases);

/**
 * @swagger
 * /api/cases/{id}:
 *   patch:
 *     summary: Update a case partially
 *     tags: [Cases]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Case ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               caseTitle:
 *                 type: string
 *               caseType:
 *                 type: string
 *               jurisdiction:
 *                 type: string
 *               priority:
 *                 type: string
 *               fillingDate:
 *                 type: string
 *                 format: date
 *               caseDescription:
 *                 type: string
 *               clientId:
 *                 type: integer
 *               clientName:
 *                 type: string
 *               clientCompany:
 *                 type: string
 *               clientEmail:
 *                 type: string
 *               clientPhone:
 *                 type: string
 *               clientAddress:
 *                 type: string
 *               opposingParty:
 *                 type: string
 *               opposingCounsel:
 *                 type: string
 *               estimatedCaseValue:
 *                 type: number
 *               lawyers:
 *                 type: array
 *                 items:
 *                   type: integer
 *               status:
 *                 type: string
 *                 enum: [active, closed, pending]
 *     responses:
 *       200:
 *         description: Case updated successfully
 *       400:
 *         description: Validation error or missing fields
 *       404:
 *         description: Case not found
 *       500:
 *         description: Internal server error
 */
router.patch("/:id", CaseController.updateCase);

/**
 * @swagger
 * /api/cases/{id}:
 *   delete:
 *     summary: Delete a case by ID
 *     tags: [Cases]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Case ID
 *     responses:
 *       200:
 *         description: Case deleted successfully
 *       404:
 *         description: Case not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", CaseController.deleteCase);

module.exports = router;
