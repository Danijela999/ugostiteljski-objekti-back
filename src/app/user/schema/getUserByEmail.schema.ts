import Joi = require("@hapi/joi");

const getUserByEmailSchema = Joi.object()
  .keys({
    email: Joi.string().required(),
  })
  .required();

export default getUserByEmailSchema;
