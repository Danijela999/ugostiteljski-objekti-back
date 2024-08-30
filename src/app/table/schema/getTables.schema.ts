import Joi = require("@hapi/joi");

const getTablesSchema = Joi.object()
  .keys({
    restaurantId: Joi.number().required(),
  })
  .required();

export default getTablesSchema;
