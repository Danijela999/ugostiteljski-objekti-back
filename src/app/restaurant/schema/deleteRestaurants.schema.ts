import Joi = require("@hapi/joi");

const deleteRestaurantSchema = Joi.object()
  .keys({
    id: Joi.number().required(),
  })
  .required();

export default deleteRestaurantSchema;
