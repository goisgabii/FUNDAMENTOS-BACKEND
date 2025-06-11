import { Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { DeleteProductService } from "./delete-product.service";

@Controller('/products/:id')
export class DeleteProductController {
  constructor(private deleteProduct: DeleteProductService) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param("id") id: string) {
    await this.deleteProduct.execute({
      id,
    });
  }
}