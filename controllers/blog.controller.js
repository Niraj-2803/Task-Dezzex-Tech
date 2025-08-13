const Blog = require("../models/blog.model");
const { success, error } = require("../utils/functions/response");
const { blogSchema, pickBlogFields } = require("../validations/blog.validation");

// Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const { error: validationError, value } = blogSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (validationError) {
      const message = validationError.details.map((d) => d.message).join(", ");
      return error(res, `Validation error: ${message}`, 400);
    }

    const id = await Blog.create(value);
    return success(res, { id }, "Blog created successfully");
  } catch (err) {
    console.error("Error in createBlog:", err);
    return error(res, "Internal server error", 500);
  }
};

// Get all blogs
exports.getBlogs = async (req, res) => {
  try {
    const { title, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const blogs = await Blog.findAll({ title }, { limit, offset });
    return success(res, blogs, "Blogs fetched successfully");
  } catch (err) {
    console.error("Error in getBlogs:", err);
    return error(res, "Internal server error", 500);
  }
};

// Update a blog post by id
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = pickBlogFields(req.body);

    if (Object.keys(updateData).length === 0) {
      return error(res, "No valid fields provided for update", 400);
    }

    const updated = await Blog.updateById(id, updateData);
    if (!updated) {
      return error(res, "Blog not found or no changes made", 404);
    }

    return success(res, null, "Blog updated successfully");
  } catch (err) {
    console.error("Error in updateBlog:", err);
    return error(res, "Internal server error", 500);
  }
};

// Delete a blog post by id
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Blog.deleteById(id);

    if (!deleted) {
      return error(res, "Blog not found", 404);
    }

    return success(res, null, "Blog deleted successfully");
  } catch (err) {
    console.error("Error in deleteBlog:", err);
    return error(res, "Internal server error", 500);
  }
};
