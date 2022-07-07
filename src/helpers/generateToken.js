//llamamos a la funcion jwt.sign para generar el token
const jwt = require('jsonwebtoken')

const generateToken = (data) => {
        const token = jwt.sign(
    {
      username: data
    },
    process.env.SECRET,
    //{ expiresIn: '1h' } (define tieempo de expiracion del token)
  )

  return token
}

module.exports = generateToken
