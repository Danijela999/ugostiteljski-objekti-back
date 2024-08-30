import Joi = require("@hapi/joi");

const updateAddressSchema = Joi.object()
  .keys({
    id: Joi.number().required(),
    address: Joi.string().required(),
  })
  .required();

export default updateAddressSchema;
