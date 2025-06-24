import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductsRepository } from './products.repository';
import { CreateProductService } from './create-product.service';
import { CreateProductController } from './create-product.controller';

@Module({
  controllers: [CreateProductController],
  providers: [CreateProductService, ProductsRepository, PrismaService],
})
export class ProductsModule {}
