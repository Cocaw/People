const Joi = require('joi');

const schema = Joi.alternatives().try(
  Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30),
    lastName: Joi.string().alphanum().min(3).max(30),
    brand: Joi.string().min(3).max(30).trim(),
  }),
  Joi.object({
    name: Joi.string().alphanum().min(3).max(30),
    displacement: Joi.string().alphanum().min(3).max(20),
    mileage: Joi.string().min(3).max(30).trim(),
    price: Joi.string().min(3).max(20).trim()
  })
)

  module.exports = schema;