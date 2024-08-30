import Joi = require("@hapi/joi");

const getRestaurantByCoordinatesSchema = Joi.object()
  .keys({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  })
  .required();

export default getRestaurantByCoordinatesSchema;
