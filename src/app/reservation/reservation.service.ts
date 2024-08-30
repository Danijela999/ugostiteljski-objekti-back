import { Injectable } from "@nestjs/common";
import { CommonResponse } from "../../http/http.response";
import {
  CustomInternalServerErrorExceptionApiG,
  CustomNotFoundExceptionApiG,
} from "../../http/apiGee/http.apiGee.exception";
import ReservationBizService from "src/bizServices/reservation/reservation.service";
import AddReservationDto from "./dto/addReservation.dto";
import GetReservationsDto from "./dto/getReservations.dto";
import DeleteReservationDto from "./dto/deleteReservation.dto";
import UpdateReservationDto from "./dto/updateReservation.dto";

@Injectable()
export default class ReservationService {
  constructor(private readonly reservationBizService: ReservationBizService) {}

  async addReservation(
    addReservationParams: AddReservationDto,
    apiCode
  ): Promise<any> {
    const { data } = await this.reservationBizService.addReservation(
      addReservationParams,
      apiCode
    );
    return new CommonResponse(null, 201, "Created", data, true);
  }

  async getReservationsPerUser(
    getReservationsParams: GetReservationsDto,
    apiCode
  ): Promise<any> {
    const reservations = await this.reservationBizService.getReservationsPerUser(
      getReservationsParams,
      apiCode
    );
    return new CommonResponse(null, 200, "OK", reservations);
  }

  async deleteReservation(
    deleteReservationParams: DeleteReservationDto,
    apiCode
  ): Promise<any> {
    const { data } = await this.reservationBizService.deleteReservation(
      deleteReservationParams,
      apiCode
    );
    return new CommonResponse(null, 204, "Deleted", data, true);
  }

  async updateReservation(
    updateReservationParams: UpdateReservationDto,
    apiCode
  ): Promise<any> {
    const { userId, restaurantId, tableId } = updateReservationParams;
    const reservations = await this.reservationBizService.getReservation(
      { userId, restaurantId, tableId },
      apiCode
    );
    if (reservations.length === 0) {
      throw new CustomNotFoundExceptionApiG(apiCode, "Reservation Not Exists")
        .exception;
    }
    const { data } = await this.reservationBizService.updateReservation(
      updateReservationParams,
      apiCode
    );
    return new CommonResponse(null, 200, "Updated", data, true);
  }
}
