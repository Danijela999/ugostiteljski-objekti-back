import Joi = require("@hapi/joi");

const changePasswordSchema = Joi.object()
  .keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  })
  .required();

export default changePasswordSchema;
