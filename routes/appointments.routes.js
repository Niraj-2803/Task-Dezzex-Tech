const express = require("express");
const router = express.Router();
const controller = require("../controllers/appointment.controller");

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment management
 */

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Create an appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientName
 *               - duration
 *               - dateTime
 *               - bookedOn
 *               - lawyer_id
 *             properties:
 *               clientName:
 *                 type: string
 *               duration:
 *                 type: string
 *               dateTime:
 *                 type: string
 *                 format: date-time
 *               bookedOn:
 *                 type: string
 *                 format: date-time
 *               lawyer_id:
 *                 type: integer
 *                 description: ID of the lawyer for the appointment
 *     responses:
 *       200:
 *         description: Appointment created successfully
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
 *                   example: Appointment created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 */
router.post("/", controller.createAppointment);

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Get all appointments with optional filters and pagination
 *     tags: [Appointments]
 *     parameters:
 *       - in: query
 *         name: clientName
 *         schema:
 *           type: string
 *         description: Filter by client name
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by date (YYYY-MM-DD)
 *       - in: query
 *         name: lawyer_id
 *         schema:
 *           type: integer
 *         description: Filter by lawyer ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         description: Page number for pagination (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *         description: Number of records per page (default 10)
 *     responses:
 *       200:
 *         description: List of appointments
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
 *                   example: Appointments fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       clientName:
 *                         type: string
 *                         example: John Doe
 *                       duration:
 *                         type: string
 *                         example: 30 minutes
 *                       dateTime:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-08-15T14:30:00.000Z
 *                       bookedOn:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-08-10T09:15:00.000Z
 *                       lawyer_id:
 *                         type: integer
 *                         example: 5
 *                       customId:
 *                         type: string
 *                         example: A001
 */
router.get("/", controller.getAppointments);

/**
 * @swagger
 * /api/appointments/lawyer/{lawyer_id}:
 *   get:
 *     summary: Get appointments for a specific lawyer by ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: lawyer_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Lawyer ID to filter appointments
 *     responses:
 *       200:
 *         description: List of appointments for the given lawyer ID
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
 *                   example: Appointments for lawyer_id 5 fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       clientName:
 *                         type: string
 *                         example: John Doe
 *                       duration:
 *                         type: string
 *                         example: 30 minutes
 *                       dateTime:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-08-15T14:30:00.000Z
 *                       bookedOn:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-08-10T09:15:00.000Z
 *                       lawyer_id:
 *                         type: integer
 *                         example: 5
 *                       customId:
 *                         type: string
 *                         example: A001
 */
router.get("/lawyer/:lawyer_id", controller.getAppointmentsByLawyerId);

module.exports = router;
