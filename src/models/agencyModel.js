//modelo de la base de datos

const mongoose = require('mongoose')

const { Schema } = mongoose

const agencyModel = new Schema({


    name:  { type: String, required: true, minLength: 3, maxLength: 30 },
    model:  { type: String, required: true, minLength: 3, maxLength: 30 },
    brand:  { type: String, required: true, minLength: 3, maxLength: 30 },
    year:  { type: Number, required: true, minLength: 3, maxLength: 30 },
    displacement:  { type: String, required: true, minLength: 3, maxLength: 30 },
    mileage:  { type: String, required: true, minLength: 3, maxLength: 30 },
    price: { type: Number, required: true, minLength: 3, maxLength: 30 },

}
)
module.exports = mongoose.model('Agency', agencyModel)
