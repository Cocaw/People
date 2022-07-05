const Joi = require('joi');

const schema = Joi.alternatives().try(
  Joi.object({
    id: Joi.string().alphanum().length(24).required()
  }),
  Joi.object({
    idAgency: Joi.string().alphanum().length(24).required()
  })
)

  module.exports = schema;