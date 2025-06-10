import { Module } from '@nestjs/common';
import { CreateProductController } from './create-product.controller';
import { PrismaService } from './prisma.service';
import { CreateProductService } from './create-product.service';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [],
  controllers: [CreateProductController],
  providers: [PrismaService, CreateProductService, ProductsRepository],
})
export class AppModule {}
