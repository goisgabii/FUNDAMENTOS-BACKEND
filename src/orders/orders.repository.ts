import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

export type OrderWithItems = Prisma.OrderGetPayload<{
  include: {
    orderItems: {
      include: {
        product: true;
      };
    };
  };
}>;

@Injectable()
export class OrdersRepository {
  constructor(private prisma: PrismaService) {}

  async findManyRecent(): Promise<Prisma.OrderUncheckedCreateInput[] | null> {
    return await this.prisma.order.findMany();
  }

  async findById(id: string): Promise<OrderWithItems | null> {
    return await this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async findByUserId(userId: string): Promise<OrderWithItems[] | null> {
    return await this.prisma.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async save(data: Prisma.OrderUncheckedCreateInput): Promise<void> {
    await Promise.all([
      this.prisma.order.update({
        where: {
          id: data.id?.toString(),
        },
        data,
      }),
    ]);
  }

  async create(order: Prisma.OrderCreateInput): Promise<void> {
    await this.prisma.order.create({
      data: order,
    });
  }

  async delete(order: Prisma.OrderUncheckedCreateInput): Promise<void> {
    await this.prisma.order.delete({
      where: {
        id: order.id?.toString(),
      },
    });
  }
}