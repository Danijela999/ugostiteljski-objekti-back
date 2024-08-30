import Joi = require("@hapi/joi");

const loginUserSchema = Joi.object()
  .keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  })
  .required();

export default loginUserSchema;
