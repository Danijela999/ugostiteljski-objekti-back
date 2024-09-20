import Joi = require("@hapi/joi");

const getReservationsSchema = Joi.object()
  .keys({
    email: Joi.string().required(),
  })
  .required();

export default getReservationsSchema;
