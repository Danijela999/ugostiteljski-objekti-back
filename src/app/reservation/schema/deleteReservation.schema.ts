import Joi = require("@hapi/joi");

const deleteReservationSchema = Joi.object()
  .keys({
    email: Joi.string().required(),
    restaurantId: Joi.number().required(),
    tableId: Joi.number().required(),
    startDateTime: Joi.string().required(),
  })
  .required();

export default deleteReservationSchema;
