import Joi = require("@hapi/joi");

const getPositionsByRestaurantSchema = Joi.object()
  .keys({
    restaurantId: Joi.number().required(),
  })
  .required();

export default getPositionsByRestaurantSchema;
