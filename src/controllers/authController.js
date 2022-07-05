const bcrypt = require('bcrypt')
const generateToken = require('../helpers/generateToken')
const httpStatus = require('../helpers/httpStatus')

const authController = (People) => {

    const logIn = async (req, res) => {
        const { body } = req
        
          //busca el json completo con el nickname
        const user = await People.findOne({
            userName: body.userName
        })

         //comprueba de que no sea null o inexistente
        if(user === null || !(await bcrypt.compare(body.password, user.password))
        ){
            return res.status(httpStatus.UNAUTHORIZED).send('Invalid credentials');
        }

        

      //al lograr logearse genera el token
      const token = generateToken(user)

      //devuelve un OK y el token
      return res.status(httpStatus.OK).json({
          status: 'OK',
          token: token
      });
  }


    const register = async (req, res) => {
        try {
            const { body } = req
    
            //hashea/encripta la contraseña al registrarse
            const encryptedPassword = await bcrypt.hash(body.password, 10)
    
            const encryptedData = {
                ...body,
                password: encryptedPassword
            }
    
              //crea el usuario con el modelo de People
            const people = await new People(encryptedData)
    
            await people.save()
    
            return res.status(httpStatus.CREATED).send('Subido correctamente');

        } catch (err) {
            next(err)
        }
      }

    return { logIn, register }
}
 
module.exports = authController