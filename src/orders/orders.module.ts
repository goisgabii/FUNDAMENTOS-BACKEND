
import { Module } from "@nestjs/common";
import { CreateOrderService } from "./create-order.service";
import { ProductsRepository } from "src/products/products.repository";
import { OrdersRepository } from "./orders.repository";
import { PrismaService } from "src/prisma.service";
import { CreateOrderController } from "./create-order.controller";
import { UsersRepository } from "src/users/user.repository";
import { GetOrderByIdController } from "./get-order-by-id.controller";
import { GetOrderByIdService } from "./get-order-by-id.service";
import { GetUserOrdersController } from "./get-user-orders.controller";
import { GetUserOrdersService } from "./get-user-orders.service";

@Module({
  controllers: [
    CreateOrderController,
    GetOrderByIdController,
    GetUserOrdersController,
  ],
  providers: [
    CreateOrderService,
    GetOrderByIdService,
    GetUserOrdersService,
    ProductsRepository,
    UsersRepository,
    OrdersRepository,
    UsersRepository,
    PrismaService,
  ],
})
export class OrdersModule {}
