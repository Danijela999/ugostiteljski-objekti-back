import Joi = require("@hapi/joi");

const getRestaurantByIdSchema = Joi.object()
  .keys({
    id: Joi.number().required(),
  })
  .required();

export default getRestaurantByIdSchema;
