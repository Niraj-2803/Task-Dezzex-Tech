const express = require("express");
const router = express.Router();
const controller = require("../controllers/blog.controller");

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog management
 */

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *               - name
 *               - law_type
 *               - title
 *               - brief
 *               - createdOn
 *               - isPosted
 *             properties:
 *               image:
 *                 type: string
 *                 format: uri
 *               name:
 *                 type: string
 *               law_type:
 *                 type: string
 *               title:
 *                 type: string
 *               brief:
 *                 type: string
 *               createdOn:
 *                 type: string
 *                 format: date-time
 *               isPosted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Blog created successfully
 */
router.post("/", controller.createBlog);

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get all blogs with optional filters and pagination
 *     tags: [Blogs]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter by blog title
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
 *         description: List of blogs fetched successfully
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
 *                   example: Blogs fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       image:
 *                         type: string
 *                         format: uri
 *                         example: https://example.com/images/blog1.jpg
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       law_type:
 *                         type: string
 *                         example: Criminal Law
 *                       title:
 *                         type: string
 *                         example: Understanding the Basics of Criminal Law
 *                       brief:
 *                         type: string
 *                         example: A brief overview of criminal law principles and practices.
 *                       createdOn:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-08-10T10:30:00.000Z
 *                       isPosted:
 *                         type: integer
 *                         enum: [0, 1]
 *                         example: 1
 *                         description: Stored as integer in DB (1=true, 0=false)
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-08-10T04:23:19.000Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-08-10T04:23:19.000Z
 *                       status:
 *                         type: string
 *                         example: Posted
 */
router.get("/", controller.getBlogs);

/**
 * @swagger
 * /api/blogs/{id}:
 *   patch:
 *     summary: Update blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Fields to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: uri
 *               name:
 *                 type: string
 *               law_type:
 *                 type: string
 *               title:
 *                 type: string
 *               brief:
 *                 type: string
 *               createdOn:
 *                 type: string
 *                 format: date-time
 *               isPosted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Blog updated successfully
 */
router.patch("/:id", controller.updateBlog);

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 */
router.delete("/:id", controller.deleteBlog);

module.exports = router;