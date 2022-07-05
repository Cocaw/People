const express = require('express')
const peopleController = require('../controllers/peopleController')
//Validator tiene 3 propiedades de utilidad:
  //validator.body()
  //validator.query()
  //validator.params()
  const validator = require('express-joi-validation').createValidator({});
  const bodySchema = require('../validations/peopleBodyValidator');
  const querySchema = require('../validations/queryValidator');
  const paramsSchema = require('../validations/paramsValidator');

const router = (People) => {
  const peopleRouter = express.Router()

  const { getAllPeople, getPeopleById, postPeople, putPeopleById, deletePeopleById } =
  peopleController(People)

  peopleRouter
    .route('/people')
    .get(validator.query(querySchema), getAllPeople)
    .post(validator.body(bodySchema), postPeople)
  
  peopleRouter
    .route('people/:id')
    .get(validator.params(paramsSchema), getPeopleById)
    .put(validator.body(bodySchema),putPeopleById)
    .delete(validator.params(paramsSchema), deletePeopleById)
  
  return peopleRouter
}

module.exports = router

