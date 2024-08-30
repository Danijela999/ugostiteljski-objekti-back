import Joi = require("@hapi/joi");

const refreshSchema = Joi.object()
  .keys({
    token: Joi.string().required(),
  })
  .required();

export default refreshSchema;
