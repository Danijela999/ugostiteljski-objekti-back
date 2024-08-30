import Joi = require("@hapi/joi");

const createUserSchema = Joi.object()
  .keys({
    email: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required(),
  })
  .required();

export default createUserSchema;
