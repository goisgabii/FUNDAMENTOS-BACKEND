import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { OrderItem } from "@prisma/client";
import { UsersRepository } from "src/users/user.repository";

export interface Order {
  id: string;
  userId: string;
  total: number;
  orderItems: OrderItem[];
  createdAt: string | Date | undefined;
  updatedAt: string | Date | null | undefined;
}

interface GetUserOrdersServiceRequest {
  userId: string;
}

type GetUserOrdersServiceResponse = {
  orders: Order[];
};

@Injectable()
export class GetUserOrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
  }: GetUserOrdersServiceRequest): Promise<GetUserOrdersServiceResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new HttpException("User not found.", HttpStatus.NOT_FOUND);
    }

    const orders = await this.ordersRepository.findByUserId(userId);

    const ordersToReturn: Order[] = [];

    if (orders) {
      for (const order of orders) {
        ordersToReturn.push({
          id: order.id?.toString() || "",
          userId: order.userId,
          total: order.total,
          orderItems: order.orderItems,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
        });
      }
    }

    return {
      orders: ordersToReturn,
    };
  }
}