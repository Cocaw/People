const jwt = require('jsonwebtoken')

const generateToken = (uploadedUser) => {
  const tokenPayLoad = {
    firstName: uploadedUser.firstName,
    lastName: uploadedUser.lastName,
    
}

const token = jwt.sign(
tokenPayLoad
, process.env.SECRET,
{ expiresIn: '1h'}
);
  return token
}

module.exports = generateToken
