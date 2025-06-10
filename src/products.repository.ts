import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async findManyRecent(): Promise<Prisma.ProductUncheckedCreateInput[] | null> {
    const products = this.prisma.product.findMany();

    return products;
  }

  async findById(id: string): Promise<Prisma.ProductUncheckedCreateInput | null> {
    const product = this.prisma.product.findUnique({
      where: {
        id,
      }
    });

    return product;
  }

  async findByName(name: string): Promise<Prisma.ProductUncheckedCreateInput | null> {
    const product = this.prisma.product.findUnique({
      where: {
        name,
      }
    });

    return product;
  }

  async save(data: Prisma.ProductUncheckedCreateInput): Promise<void> {
    await Promise.all([
      this.prisma.product.update({
        where: {
          id: data.id?.toString(),
        },
        data,
      }),
    ]);
  }

  async create(product: Prisma.ProductUncheckedCreateInput): Promise<Prisma.ProductUncheckedCreateInput> {
    return await this.prisma.product.create({
      data: product,
    });
  }

  async delete(product: Prisma.ProductUncheckedCreateInput): Promise<void> {
    await this.prisma.product.delete({
      where: {
        id: product.id?.toString(),
      }
    });
  }
}