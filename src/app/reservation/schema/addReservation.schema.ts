import Joi = require("@hapi/joi");

const addReservationSchema = Joi.object()
  .keys({
    userId: Joi.string().required(),
    restaurantId: Joi.number().required(),
    positionId: Joi.number().required(),
    categoryId: Joi.number().required(),
    startDateTime: Joi.date().required(),
  })
  .required();

export default addReservationSchema;
