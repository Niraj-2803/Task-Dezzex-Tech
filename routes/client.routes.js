const express = require("express");
const router = express.Router();
const controller = require("../controllers/client.controller");

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Client management
 */

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientType
 *               - firstName
 *               - lastName
 *               - email
 *               - phoneNumber
 *               - streetAddress
 *               - city
 *               - state
 *               - zipCode
 *               - country
 *               - assignedLawyer
 *               - priority
 *               - billed
 *             properties:
 *               clientType:
 *                 type: string
 *                 example: Corporate
 *               firstName:
 *                 type: string
 *                 example: Jane
 *               lastName:
 *                 type: string
 *                 example: Smith
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jane.smith@example.com
 *               phoneNumber:
 *                 type: string
 *                 example: 1234567890
 *               altPhoneNumber:
 *                 type: string
 *                 example: 0987654321
 *               website:
 *                 type: string
 *                 example: https://janesmithcorp.com
 *               streetAddress:
 *                 type: string
 *                 example: 123 Main St
 *               city:
 *                 type: string
 *                 example: Mumbai
 *               state:
 *                 type: string
 *                 example: Maharashtra
 *               zipCode:
 *                 type: string
 *                 example: 400001
 *               country:
 *                 type: string
 *                 example: India
 *               assignedLawyer:
 *                 type: integer
 *                 example: 3
 *               priority:
 *                 type: string
 *                 enum: [Low, Medium, High]
 *                 example: High
 *               billed:
 *                 type: boolean
 *                 example: true
 *               notes:
 *                 type: string
 *                 example: Important client, requires monthly reports
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: active
 *     responses:
 *       200:
 *         description: Client created successfully
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
 *                   example: Client created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 12
 */

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Get list of clients with optional filters and pagination
 *     tags: [Clients]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by client first or last name
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive]
 *         description: Filter by client status
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *     responses:
 *       200:
 *         description: Clients fetched successfully
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
 *                   example: Clients fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 12
 *                       clientType:
 *                         type: string
 *                         example: Corporate
 *                       firstName:
 *                         type: string
 *                         example: Jane
 *                       lastName:
 *                         type: string
 *                         example: Smith
 *                       email:
 *                         type: string
 *                         example: jane.smith@example.com
 *                       phoneNumber:
 *                         type: string
 *                         example: 1234567890
 *                       altPhoneNumber:
 *                         type: string
 *                         example: 0987654321
 *                       website:
 *                         type: string
 *                         example: https://janesmithcorp.com
 *                       streetAddress:
 *                         type: string
 *                         example: 123 Main St
 *                       city:
 *                         type: string
 *                         example: Mumbai
 *                       state:
 *                         type: string
 *                         example: Maharashtra
 *                       zipCode:
 *                         type: string
 *                         example: 400001
 *                       country:
 *                         type: string
 *                         example: India
 *                       assignedLawyer:
 *                         type: integer
 *                         example: 3
 *                       priority:
 *                         type: string
 *                         example: High
 *                       billed:
 *                         type: boolean
 *                         example: true
 *                       notes:
 *                         type: string
 *                         example: Important client, requires monthly reports
 *                       status:
 *                         type: string
 *                         example: active
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-08-10T04:23:19.000Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-08-10T04:23:19.000Z
 */

/**
 * @swagger
 * /api/clients/{id}:
 *   patch:
 *     summary: Update an existing client (partial update)
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Client ID to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientType:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phoneNumber:
 *                 type: string
 *               altPhoneNumber:
 *                 type: string
 *               website:
 *                 type: string
 *               streetAddress:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               country:
 *                 type: string
 *               assignedLawyer:
 *                 type: integer
 *               priority:
 *                 type: string
 *                 enum: [Low, Medium, High]
 *               billed:
 *                 type: boolean
 *               notes:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       200:
 *         description: Client updated successfully
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
 *                   example: Client updated successfully
 *       400:
 *         description: No valid fields provided for update
 *       404:
 *         description: Client not found
 */

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Delete a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Client ID to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Client deleted successfully
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
 *                   example: Client deleted successfully
 *       404:
 *         description: Client not found
 */

router.post("/", controller.createClient);
router.get("/", controller.getClients);
router.patch("/:id", controller.updateClient);
router.delete("/:id", controller.deleteClient);

module.exports = router;