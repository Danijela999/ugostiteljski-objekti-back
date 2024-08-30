import { Injectable } from "@nestjs/common";
import AddReservationDto from "src/app/reservation/dto/addReservation.dto";
import DeleteReservationDto from "src/app/reservation/dto/deleteReservation.dto";
import GetReservationByResIdTableDto from "src/app/reservation/dto/getReservationByResIdTable.dto";
import GetReservationsDto from "src/app/reservation/dto/getReservations.dto";
import UpdateReservationDto from "src/app/reservation/dto/updateReservation.dto";
import ReservationDB from "src/biz/mysql/reservation/reservationDB";
import { CustomInternalServerErrorExceptionApiG } from "src/http/apiGee/http.apiGee.exception";

@Injectable()
export default class ReservationBizService {
  constructor(private readonly reservationPDB: ReservationDB) {}

  async addReservation(
    addReservationParams: AddReservationDto,
    apiCode
  ): Promise<any> {
    try {
      return await this.reservationPDB.addReservation(addReservationParams);
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }

  async getReservationsPerUser(
    getReservationsParams: GetReservationsDto,
    apiCode
  ): Promise<any> {
    try {
      return await this.reservationPDB.getReservationsPerUser(
        getReservationsParams
      );
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }

  async deleteReservation(
    deleteReservationParams: DeleteReservationDto,
    apiCode
  ): Promise<any> {
    try {
      return await this.reservationPDB.deleteReservation(
        deleteReservationParams
      );
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }

  async updateReservation(
    updateReservationParams: UpdateReservationDto,
    apiCode
  ): Promise<any> {
    try {
      return await this.reservationPDB.updateReservation(
        updateReservationParams
      );
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }

  async getReservation(
    getReservationParams: GetReservationByResIdTableDto,
    apiCode
  ): Promise<any> {
    try {
      return await this.reservationPDB.getReservation(getReservationParams);
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }
}
