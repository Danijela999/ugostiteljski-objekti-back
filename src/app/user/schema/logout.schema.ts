import Joi = require("@hapi/joi");

const logoutSchema = Joi.object()
  .keys({
    accessToken: Joi.string().required(),
    refreshToken: Joi.string().required(),
  })
  .required();

export default logoutSchema;
