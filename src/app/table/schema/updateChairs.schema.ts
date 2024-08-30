import Joi = require("@hapi/joi");

const updateChairsSchema = Joi.object()
  .keys({
    tableId: Joi.number().required(),
    chairs: Joi.number().required(),
    restaurantId: Joi.number().required(),
  })
  .required();

export default updateChairsSchema;
