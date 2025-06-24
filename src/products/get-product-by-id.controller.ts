
import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { GetProductByIdService } from "../get-product-by-id.service";

@Controller("/products/:id")
export class GetProductByIdController {
  constructor(private getProductById: GetProductByIdService) {}

  @Get()
  @HttpCode(200)
  async handle(@Param("id") id: string) {
    const product = await this.getProductById.execute({
      id,
    });

    return {
      product,
    };
  }
}
