import Joi = require("@hapi/joi");

const addReservationSchema = Joi.object()
  .keys({
    userId: Joi.number().required(),
    restaurantId: Joi.number().required(),
    tableId: Joi.number().required(),
    time: Joi.date().required(),
    note: Joi.string().required(),
  })
  .required();

export default addReservationSchema;
