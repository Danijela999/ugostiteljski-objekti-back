import Joi = require("@hapi/joi");

const addRestaurantSchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    address: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    imageUrl: Joi.string().required(),
    email: Joi.string().required(),
    categories: Joi.array().required(),
    tableData: Joi.array().required()
  })
  .required();

export default addRestaurantSchema;
