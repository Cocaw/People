const bcrypt = require('bcrypt')
const httpStatus = require('../helpers/httpStatus')

const peopleController = (People) => {
     //trae por query a los usuarios
  const getAllPeople = async (req, res, next) => {
    try {
      const { query } = req

      const people = await People.find(query)

      return res.status(httpStatus.CREATED).json(people);

    } catch (err) {
      next(err)
      
    }
  }

  //Crea usuarios
  const postPeople = async (req, res, next) =>{
    try {
      const { body } = req
      
      const encryptedPassword = await bcrypt.hash(body.password, 10)

      const encryptedData = {
        ...body,
        password: encryptedPassword
      }

      const people = await new People(encryptedData)

      await people.save()

      return res.status(201).json(people)
    } catch (err) {
      res.status(500).send({
        error: err.name,
        cause: err.message
      })
    }
  }

    //edita

  const putPeopleById = async (req, res) => {
    try {
      const { body, params } = req

      const checkData = await People.find({
        _id: params.id
      })

      if (checkData === null) {
        res.status(403).send('No data found with the provided ID.')
      }

      const encryptedPassword = await bcrypt.hash(body.password, 10)

      await People.updateOne(
        {
          _id: params.id
        },
        {
          $set: {
            firstName: body.firstName,
            lastName: body.lastName,
            username: body.username,
            password: encryptedPassword,
            email: body.email,
            address: body.address,
            phone: body.phone
          }
        }
      )

      res.status(201).send('Data successful updated')
    } catch (err) {
      res.status(500).send(err.name)
    }
  }

        //params hace referencia a cuando se pone :id

  const getPeopleById = async (req, res) => {
   try{ 
      const { params } = req
      
      const response = await People.findById(params.id)

      res.status(200).json(response)
    } catch (err) {
      res.status(500).send(err.name)
    }
  }

          //elimina

  const deletePeopleById = async (req, res) => {
    try{ 
      const { params } = req

      const response = await People.findByIdAndDelete(params.id)

      res.status(202).json(response)
    } catch (err) {
      res.status(500).send(err.name)
    }
  }
    //esto sirve para guardar las funciones dentro de un objeto
        //esto se hace por que la funcion tiene funciones mas pequeñas dentro, entonces se trae el funcionamiento de ambas de esta forma
            //este objeto luego sera desestructurado para que vuelva a leerse como codigo js.

  return {
    getAllPeople,
    getPeopleById,
    postPeople,
    putPeopleById,
    deletePeopleById
  }
}

module.exports = peopleController