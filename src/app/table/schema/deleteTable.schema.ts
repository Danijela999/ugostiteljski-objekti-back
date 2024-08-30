import Joi = require("@hapi/joi");

const deleteTableSchema = Joi.object()
  .keys({
    id: Joi.number().required(),
  })
  .required();

export default deleteTableSchema;
