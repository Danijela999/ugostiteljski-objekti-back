import Joi = require("@hapi/joi");

const getUserRoleByEmailSchema = Joi.object()
  .keys({
    email: Joi.string().required(),
  })
  .required();

export default getUserRoleByEmailSchema;
