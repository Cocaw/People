const httpStatus =require('../helpers/httpStatus')

const agencyController = (Agency) => {

    
    const getAllAgency = async (req, res, next) => {
       try{
            const { query} = req

            const agency = await Agency.find(query)
            return res.status(httpStatus.CREATED).json(agency)
        } catch (err){
            next(err)
        }

    }

    const postAgency = async (req, res, next) => {    
        try{
            const { body } = req
           
            const agency = await new Agency(body)
           
            await agency.save()
           
            return res.status(httpStatus.CREATED).send("Objeto cargado correctamente")
        
        }catch(err){
            next(err)
        }
    }


       //params hace referencia a cuando se pone :id
       const getAgencyById = async(req, res, next) => {
        try{
            const { params } = req

            const agency = await Agency.findById(params.id)

            return res.status(httpStatus.OK).json(agency)

        }catch {
            next(err)
        }
    }

    
    const putAgencyById = async (req, res, next) => {
        try{
            const { params, body } = req
            await Agency.findByIdAndUpdate(
                {
                  _id: params.id
            },
                {
                    name: body.name,
                    model: body.model,
                    brand: body.brand,
                    year: body.year,
                    displacement: body.displacement,
                    mileage: body.mileage,
                    price: body.price,
                  },
              )
            return res.status(httpStatus.OK).send('Objeto actualizado correctamente')
        }catch{
            next(err)
        }
      }

      
    const deleteAgencyById = async  (req, res, next) => {
        try{
            const { params } = req

            await Agency.findByIdAndDelete(params.id)
        
            return res.status(httpStatus.OK).send('Eliminado correctamente')
        }catch(err){
            next(err)
        }
    }

    //esto sirve para guardar las funciones dentro de un objeto
        //esto se hace por que la funcion tiene funciones mas pequeñas dentro, entonces se trae el funcionamiento de ambas de esta forma
            //este objeto luego sera desestructurado para que vuelva a leerse como codigo js.
    return { getAllAgency, getAgencyById, postAgency, deleteAgencyById, putAgencyById}
}

module.exports = agencyController