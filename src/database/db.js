const mongoose = require('mongoose')

console.log('Connecting to MongoDB...')

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('Data base connected'))
  .catch((err) => console.error('could not connect to DB'))
  
  
   module.exports = mongoose;