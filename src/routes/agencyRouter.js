const express = require('express');
const agencyController = require('../controllers/agencyController');
const validator = require('express-joi-validation').createValidator({});
const bodySchema = require('../validations/peopleBodyValidator');
const querySchema = require('../validations/queryValidator');
const paramsSchema = require('../validations/paramsValidator');


const router = (Agency) => {
  const agencyRouter = express.Router();

    const { getAllAgency, getAgencyById, postAgency, deleteAgencyById, putAgencyById} = agencyController(Agency);

    peopleRouter.route('/agency').get(validator.query(querySchema) ,getAllAgency).post(validator.body(bodySchema), postAgency);

    peopleRouter.route('/agency/:idAgency').get(validator.params(paramsSchema) ,getAgencyById).delete(validator.params(paramsSchema) ,deleteAgencyById)
                                        .put(validator.params(paramsSchema), validator.body(bodySchema), putAgencyById);

  return agencyRouter;
}

module.exports = router