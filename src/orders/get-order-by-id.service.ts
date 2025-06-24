import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { OrderItem } from "@prisma/client";

export interface Order {
  id: string;
  userId: string;
  total: number;
  orderItems: OrderItem[];
  createdAt: string | Date | undefined;
  updatedAt: string | Date | null | undefined;
}

interface GetOrderByIdServiceRequest {
  id: string;
}

type GetOrderByIdServiceResponse = {
  order: Order;
};

@Injectable()
export class GetOrderByIdService {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    id,
  }: GetOrderByIdServiceRequest): Promise<GetOrderByIdServiceResponse> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new HttpException("Order not found.", HttpStatus.NOT_FOUND);
    }

    const newOrder: Order = {
      id: order.id?.toString() || "",
      userId: order.userId,
      total: order.total,
      orderItems: order.orderItems,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };

    return {
      order: newOrder,
    };
  }
}