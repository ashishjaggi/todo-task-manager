const Joi = require('joi');


const taskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow('').optional(),
  completed: Joi.boolean().optional(),
});

module.exports = {
  taskSchema,
};
