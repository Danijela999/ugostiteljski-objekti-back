import Joi = require("@hapi/joi");

const updateReservationSchema = Joi.object()
  .keys({
    userId: Joi.number().required(),
    restaurantId: Joi.number().required(),
    tableId: Joi.number().required(),
    time: Joi.date().required(),
  })
  .required();

export default updateReservationSchema;
