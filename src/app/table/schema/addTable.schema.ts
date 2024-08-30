import Joi = require("@hapi/joi");

const addTableSchema = Joi.object()
  .keys({
    tableId: Joi.number().required(),
    comment: Joi.string().required(),
    chairs: Joi.number().required(),
    restaurantId: Joi.number().required(),
  })
  .required();

export default addTableSchema;
