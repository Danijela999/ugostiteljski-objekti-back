import Joi = require("@hapi/joi");

const forgotPasswordSchema = Joi.object()
  .keys({
    email: Joi.string().required(),
  })
  .required();

export default forgotPasswordSchema;
