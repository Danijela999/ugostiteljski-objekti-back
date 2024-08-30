import Joi = require("@hapi/joi");

const changeProfilePhotoSchema = Joi.object()
  .keys({
    email: Joi.string().required(),
    photoUrl: Joi.string().required(),
  })
  .required();

export default changeProfilePhotoSchema;
