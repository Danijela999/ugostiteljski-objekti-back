import Joi = require("@hapi/joi");

const getReservationsByRestaurantSchema = Joi.object()
  .keys({
    restaurantId: Joi.number().required(),
  })
  .required();

export default getReservationsByRestaurantSchema;
