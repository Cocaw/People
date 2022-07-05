const Joi = require('joi')


const bodySchema = Joi.alternatives().try(
  Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    username: Joi.string().min(3).max(30).trim().required(),
    password: Joi.string().required().min(3).max(30),
    phone: Joi.string().min(9).max(13).required(),
    
    //buscar validacion para fechas.
    datePeople: Joi.string(),
    address: Joi.string().required(),
    email: Joi.string().email().required()
  }),
  Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    model: Joi.string().alphanum().min(3).max(30).required(),
    brand: Joi.string().alphanum().min(3).max(20).required(),
    year: Joi.string().alphanum().min(3).max(20).required(),
    displacement: Joi.string().alphanum().min(3).max(20).required(),
    mileage: Joi.string().alphanum().min(3).max(30).required(),
    //agregar date mas tarde.
    price: Joi.string().alphanum().min(3).max(20).required(),
  })
)
module.exports = bodySchema;