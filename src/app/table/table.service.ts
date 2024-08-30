import { Injectable } from "@nestjs/common";
import { CommonResponse } from "../../http/http.response";
import TableBizService from "src/bizServices/table/table.service";
import AddTableDto from "./dto/addTable.dto";
import GetTablesDto from "./dto/getTables.dto";
import DeleteTableDto from "./dto/deleteTable.dto";

import UpdateChairsDto from "./dto/updateChairs.dto";
import {
  CustomInternalServerErrorExceptionApiG,
  CustomNotFoundExceptionApiG,
} from "src/http/apiGee/http.apiGee.exception";

@Injectable()
export default class TableService {
  constructor(private readonly tableBizService: TableBizService) {}

  async addTable(addTableParams: AddTableDto, apiCode: string): Promise<any> {
    const { data } = await this.tableBizService.addTable(
      addTableParams,
      apiCode
    );
    return new CommonResponse(null, 201, "Created", data, true);
  }

  async getTablesPerRestaurant(
    getTablesParams: GetTablesDto,
    apiCode: string
  ): Promise<any> {
    const tables = await this.tableBizService.getTablesPerRestaurant(
      getTablesParams,
      apiCode
    );
    if (tables.length === 0) {
      throw new CustomNotFoundExceptionApiG(apiCode, "Table Not Found")
        .exception;
    }
    return new CommonResponse(null, 200, "OK", tables);
  }

  async deleteTable(
    deleteTableParams: DeleteTableDto,
    apiCode: string
  ): Promise<any> {
    const { data } = await this.tableBizService.deleteTable(
      deleteTableParams,
      apiCode
    );
    return new CommonResponse(null, 204, "Deleted", data, true);
  }

  async updateChairs(
    updateChairsParams: UpdateChairsDto,
    apiCode: string
  ): Promise<any> {
    const { restaurantId, tableId } = updateChairsParams;
    const tables = await this.tableBizService.getTablesByTableIdRestaurantId(
      {
        restaurantId,
        tableId,
      },
      apiCode
    );
    if (tables.length > 0) {
      const { data } = await this.tableBizService.updateChairs(
        updateChairsParams,
        apiCode
      );
      return new CommonResponse(null, 200, "Updated", data, true);
    } else {
      throw new CustomNotFoundExceptionApiG(apiCode, "Table not found")
        .exception;
    }
  }
}
