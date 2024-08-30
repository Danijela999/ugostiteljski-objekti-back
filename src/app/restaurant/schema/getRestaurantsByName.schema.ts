import Joi = require("@hapi/joi");

const getRestaurantByNameSchema = Joi.object()
  .keys({
    name: Joi.string().required(),
  })
  .required();

export default getRestaurantByNameSchema;
