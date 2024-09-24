import Joi = require("@hapi/joi");

const getReservationsByRestaurantSchema = Joi.object()
  .keys({
    email: Joi.string().required(),
  })
  .required();

export default getReservationsByRestaurantSchema;
