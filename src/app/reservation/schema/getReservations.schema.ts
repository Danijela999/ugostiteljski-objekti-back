import Joi = require("@hapi/joi");

const getReservationsSchema = Joi.object()
  .keys({
    userId: Joi.number().required(),
  })
  .required();

export default getReservationsSchema;
