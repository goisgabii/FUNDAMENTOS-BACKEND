import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { ProductsRepository } from "src/products/products.repository";
import { UsersRepository } from "src/users/user.repository";
import { OrderItem, Prisma } from "@prisma/client";

interface OrderItemInput {
  productId: string;
  quantity: number;
}

interface CreateOrderServiceRequest {
  userId: string;
  orderItems: OrderItemInput[];
}

@Injectable()
export class CreateOrderService {
  constructor(
    private ordersRepository: OrdersRepository,
    private productsRepository: ProductsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
    orderItems,
  }: CreateOrderServiceRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new HttpException("User not found.", HttpStatus.NOT_FOUND);
    }

    let totalOrderPrice = 0;
    const orderItemsToCreate: Prisma.OrderItemCreateWithoutOrderInput[] = [];

    for (const item of orderItems) {
      const orderProduct = await this.productsRepository.findById(
        item.productId
      );

      if (!orderProduct) {
        throw new HttpException(
          `Product not found for item: ${item.productId}.`,
          HttpStatus.NOT_FOUND
        );
      }

      if (orderProduct.inStock < item.quantity) {
        throw new HttpException(
          `Insufficient stock for product: ${item.productId}.`,
          HttpStatus.BAD_REQUEST
        );
      }

      totalOrderPrice += orderProduct.price * item.quantity;

      orderItemsToCreate.push({
        quantity: item.quantity,
        product: {
          connect: {
            id: item.productId,
          },
        },
      });
    }

    const order = {
      total: totalOrderPrice,
      user: {
        connect: { id: userId },
      },
      orderItems: {
        create: orderItemsToCreate,
      },
    };

    await this.ordersRepository.create(order);
  }
}