const express = require("express");
const router = express.Router();
const controller = require("../controllers/lawyer.controller");

/**
 * @swagger
 * tags:
 *   name: Lawyers
 *   description: Lawyer management
 */

/**
 * @swagger
 * /api/lawyer:
 *   post:
 *     summary: Create a lawyer
 *     tags: [Lawyers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - mobile
 *               - email
 *               - country
 *               - yearsOfExperience
 *               - languages
 *               - lawyerType
 *               - practiceAreas
 *               - consultantAvailability
 *               - timing
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               mobile:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               country:
 *                 type: string
 *               yearsOfExperience:
 *                 type: integer
 *                 minimum: 0
 *               languages:
 *                 type: array
 *                 items:
 *                   type: string
 *               lawyerType:
 *                 type: string
 *               about:
 *                 type: string
 *               practiceAreas:
 *                 type: array
 *                 items:
 *                   type: string
 *               consultantAvailability:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Day of week e.g. Sunday, Monday
 *               timing:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Time range e.g. 12:00-14:00
 *     responses:
 *       200:
 *         description: Lawyer created successfully
 */
router.post("/", controller.createLawyer);

/**
 * @swagger
 * /api/lawyer:
 *   get:
 *     summary: Get list of lawyers with filters and pagination
 *     tags: [Lawyers]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Search by first or last name
 *       - in: query
 *         name: lawyerType
 *         schema:
 *           type: string
 *         description: Filter by lawyer type
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Filter by country
 *       - in: query
 *         name: minExperience
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Minimum years of experience
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of lawyers
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
 *                   example: Lawyers fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       fullName:
 *                         type: string
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                       mobile:
 *                         type: string
 *                       email:
 *                         type: string
 *                       country:
 *                         type: string
 *                       yearsOfExperience:
 *                         type: integer
 *                       languages:
 *                         type: array
 *                         items:
 *                           type: string
 *                       lawyerType:
 *                         type: string
 *                       about:
 *                         type: string
 *                       practiceAreas:
 *                         type: array
 *                         items:
 *                           type: string
 *                       consultantAvailability:
 *                         type: array
 *                         items:
 *                           type: string
 *                       timing:
 *                         type: array
 *                         items:
 *                           type: string
 */
router.get("/", controller.getLawyers);

/**
 * @swagger
 * /api/lawyer/{id}:
 *   put:
 *     summary: Update a lawyer by ID
 *     tags: [Lawyers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Lawyer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               mobile:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               country:
 *                 type: string
 *               yearsOfExperience:
 *                 type: integer
 *                 minimum: 0
 *               languages:
 *                 type: array
 *                 items:
 *                   type: string
 *               lawyerType:
 *                 type: string
 *               about:
 *                 type: string
 *               practiceAreas:
 *                 type: array
 *                 items:
 *                   type: string
 *               consultantAvailability:
 *                 type: array
 *                 items:
 *                   type: string
 *               timing:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Lawyer updated successfully
 *       404:
 *         description: Lawyer not found
 */
router.put("/:id", controller.updateLawyer);

/**
 * @swagger
 * /api/lawyer/{id}:
 *   delete:
 *     summary: Delete a lawyer by ID
 *     tags: [Lawyers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lawyer ID
 *     responses:
 *       200:
 *         description: Lawyer deleted successfully
 *       404:
 *         description: Lawyer not found
 */
router.delete("/:id", controller.deleteLawyer);

module.exports = router;