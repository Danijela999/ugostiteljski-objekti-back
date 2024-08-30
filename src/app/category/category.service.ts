import { Injectable } from "@nestjs/common";
import { CommonResponse } from "../../http/http.response";
import CategoryBizService from "src/bizServices/category/category.service";

@Injectable()
export default class CategoryService {
  constructor(private readonly categoryBizService: CategoryBizService) {}

  async getCategories(apiCode): Promise<any> {
    const categories = await this.categoryBizService.getCategories(apiCode);
    return new CommonResponse(null, 200, "OK", categories);
  }
}
