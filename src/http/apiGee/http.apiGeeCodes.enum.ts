const project = () => {
  const apiCode = "123";
  return {
    RestaurantController: apiCode,
    UserController: apiCode,
    TableController: apiCode,
    ReservationController: apiCode,
  };
};

export const httpApiGeeCodes = {
  ...project(),
};
