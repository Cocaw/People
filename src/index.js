const express = require('express')
const People = require('./models/peopleModel')
const peopleRouter = require('./routes/peopleRouter')(People)
const authRouter = require('./routes/authRouter')(People)
const Agency = require('./models/agencyModel')
const agencyRouter = require('./routes/peopleRouter')(Agency)
const errorHandler = require('./middleware/errorHandler')
const httpStatus = require('./helpers/httpStatus')

//trae el env a toda la api
require("dotenv").config()
const { expressjwt } = require('express-jwt')


const PORT = process.env.PORT || 5000

//Se pone express dentro de una variable para poder ser utilizado
const app = express()

//se llama a la base de datos
require('./database/db')

//las dos lineas  dicen que se va a trabajar con json
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Token
app.all('/api/*', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }).
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


//endpoints 
app.use('/api', peopleRouter) 
  app.use('/', authRouter)
app.use("/api", agencyRouter)
//luego del routeo se llama a la funcion que determina que error sucedio
app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log('Server is running')
})