import { Injectable } from "@nestjs/common";
import CategoryDB from "src/biz/mysql/category/categoryDB";
import { CustomInternalServerErrorExceptionApiG } from "src/http/apiGee/http.apiGee.exception";

@Injectable()
export default class CategoryBizService {
  constructor(private readonly categoryDB: CategoryDB) {}

  async getCategories(apiCode: string): Promise<any> {
    try {
      return await this.categoryDB.getCategories();
    } catch (err) {
      throw new CustomInternalServerErrorExceptionApiG(apiCode, err).exception;
    }
  }
}
