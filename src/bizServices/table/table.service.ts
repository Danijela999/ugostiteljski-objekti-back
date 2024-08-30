import { Injectable } from "@nestjs/common";
import AddTableDto from "src/app/table/dto/addTable.dto";
import DeleteTableDto from "src/app/table/dto/deleteTable.dto";
import GetTablesDto from "src/app/table/dto/getTables.dto";
import GetTableByTableIdAndRestaurantIdDto from "src/app/table/dto/getTablesByIdAndRes.dto";
import UpdateChairsDto from "src/app/table/dto/updateChairs.dto";
import TableDB from "src/biz/mysql/table/tableDB";
import { CustomInternalServerErrorExceptionApiG } from "src/http/apiGee/http.apiGee.exception";

@Injectable()
export default class TableBizService {
  constructor(private readonly tableDB: TableDB) {}

  async addTable(addTableParams: AddTableDto, apiCode): Promise<any> {
    try {
      return await this.tableDB.addTable(addTableParams);
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }

  async getTablesPerRestaurant(
    getTablesParams: GetTablesDto,
    apiCode
  ): Promise<any> {
    try {
      return await this.tableDB.getTablesPerRestaurant(getTablesParams);
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }

  async deleteTable(deleteTableParams: DeleteTableDto, apiCode): Promise<any> {
    try {
      return await this.tableDB.deleteTable(deleteTableParams);
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }

  async updateChairs(
    updateChairsParams: UpdateChairsDto,
    apiCode
  ): Promise<any> {
    try {
      return await this.tableDB.updateChairs(updateChairsParams);
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }

  async getTablesByTableIdRestaurantId(
    getTableByTableIdAndRestaurantIdParams: GetTableByTableIdAndRestaurantIdDto,
    apiCode
  ): Promise<any> {
    try {
      return await this.tableDB.getTablesByTableIdRestaurantId(
        getTableByTableIdAndRestaurantIdParams
      );
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }
}
