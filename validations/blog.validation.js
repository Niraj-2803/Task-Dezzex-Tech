const Joi = require("joi");

const blogSchema = Joi.object({
  image: Joi.string().uri().required(),
  name: Joi.string().required(),
  law_type: Joi.string().required(),
  title: Joi.string().required(),
  brief: Joi.string().required(),
  createdOn: Joi.date().required(),
  isPosted: Joi.boolean().required(),
});

const blogFields = [
  "image",
  "name",
  "law_type",
  "title",
  "brief",
  "createdOn",
  "isPosted",
];

function pickBlogFields(body) {
  return blogFields.reduce((obj, key) => {
    if (body[key] !== undefined) obj[key] = body[key];
    return obj;
  }, {});
}

module.exports = {
  blogSchema,
  pickBlogFields,
};