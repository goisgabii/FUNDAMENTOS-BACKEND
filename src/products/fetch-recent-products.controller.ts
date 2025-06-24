import { Controller, Get, HttpCode } from "@nestjs/common";
import { FetchRecentProductsService } from "../fetch-recent-products.service";

@Controller("/products")
export class FetchRecentProductsController {
  constructor(private fetchRecentProducts: FetchRecentProductsService) {}

  @Get()
  @HttpCode(200)
  async handle() {
    const products = await this.fetchRecentProducts.execute();

    return {
      products,
    };
  }
}