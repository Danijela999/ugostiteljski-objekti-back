import Joi = require("@hapi/joi");

const userRoleSchema = Joi.object()
  .keys({
    email: Joi.string()
      .email()
      .required(),
    privilegeId: Joi.number()
      .integer()
      .valid(1, 2)
      .required(),
  })
  .required();

const changeRolesSchema = Joi.object()
  .keys({
    users: Joi.array()
      .items(userRoleSchema)
      .required(),
  })
  .required();

export default changeRolesSchema;
