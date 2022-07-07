const Joi = require('joi')

const schema = Joi.object(
    {
    
        name: Joi.string().min(3).max(30).required(),
        model:  Joi.string().min(3).max(30).required(),
        brand:     Joi.string().required(),
        year:  Joi.string().required(),
        displacement:  Joi.string().min(1).max(50).required(),
        mileage:  Joi.string().min(6).max(16).required(),
        price:  Joi.string().required(),
        
    }
)

module.exports = schema 