import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { GetOrderByIdService } from "./get-order-by-id.service";

@Controller("/orders/:id")
export class GetOrderByIdController {
  constructor(private getOrderById: GetOrderByIdService) {}

  @Get()
  @HttpCode(200)
  async handle(@Param("id") id: string) {
    const order = await this.getOrderById.execute({
      id,
    });

    return {
      order,
    };
  }
}