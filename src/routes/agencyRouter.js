const express = require('express')
const agencyController = require('../controllers/agencyController')
const validator = require('express-joi-validation').createValidator({})
const bodySchema = require('../validations/agencyBodyValidator')


const router = (Agency) => {
  const agencyRouter = express.Router()

  const { getAllAgency, getAgencyById, postAgency, deleteAgencyById, putAgencyById } = agencyController(Agency)

  agencyRouter
  .route('/agency')
  .get(getAllAgency)
  .post(validator.body(bodySchema), postAgency)

  agencyRouter
  .route('/agency/:id')
  .get(getAgencyById)
  .delete(deleteAgencyById)
  .put(validator.body(bodySchema), putAgencyById)

  return agencyRouter
}

module.exports = router