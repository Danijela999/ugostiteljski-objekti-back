import Joi = require("@hapi/joi");

const getAvailableSlotsSchema = Joi.object()
  .keys({
    positionId: Joi.number().required(),
    categoryId: Joi.number().required(),
    restaurantId: Joi.number().required(),
    chairs: Joi.number().required(),
  })
  .required();

export default getAvailableSlotsSchema;
