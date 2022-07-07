const express = require('express')
const People = require('./models/peopleModel')
const peopleRouter = require('./routes/peopleRouter')(People)
const authRouter = require('./routes/authRouter')(People)
const Agency = require('./models/agencyModel')
const agencyRouter = require('./routes/agencyRouter')(Agency)
const errorHandler = require('./middleware/errorHandler')
const httpStatus = require('./helpers/httpStatus')
const cors = require('cors');
//llama a las peticiones que estuvvimos haciendo durate la api

//llama al  env 
require("dotenv").config()
const { expressjwt } = require('express-jwt')


const PORT = process.env.PORT || 5000


const app = express()

//se llama a la base de datos
require('./database/db')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Token
app.all('/*', 
expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }).
  unless({
    path: ['/auth/login', '/auth/register']
  })

)



//middleware por si no estas authorizado por el token
app.use((err, _, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(httpStatus.UNAUTHORIZED).json({
      error: err.name,
      cause: 'Unauthorized. Missing or invalid token provided.'
    })
  } else {
    next(err)
  }
})


//endpoints conectado rutas
app.use('/api', peopleRouter, agencyRouter) 
  app.use('/', authRouter)

//luego del routeo se llama a la funcion que determina que error sucedio
app.use(errorHandler)


app.listen(process.env.PORT, () => {
  console.log('Server is running')
})