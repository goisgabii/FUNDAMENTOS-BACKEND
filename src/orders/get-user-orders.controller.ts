import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { GetUserOrdersService } from "./get-user-orders.service";

@Controller("/users/:userId/orders")
export class GetUserOrdersController {
  constructor(private getUserOrders: GetUserOrdersService) {}

  @Get()
  @HttpCode(200)
  async handle(@Param("userId") userId: string) {
    const orders = await this.getUserOrders.execute({
      userId,
    });

    return {
      orders,
    };
  }
}