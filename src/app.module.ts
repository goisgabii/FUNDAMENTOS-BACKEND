import { Module } from '@nestjs/common';
import { CreateProductController } from './create-product.controller';
import { PrismaService } from './prisma.service';
import { CreateProductService } from './create-product.service';
import { ProductsRepository } from './products.repository';
import { CreateModelController } from './create-model.controller';
import { DeleteModelController } from './delete-model.controller';
import { DeleteProductController } from './delete-product.controller';
import { EditModelController } from './edit-model.controller';
import { EditProductController } from './edit-product.controller';
import { FetchRecentModelsController } from './fetch-recent-models.controller';
import { FetchRecentProductsController } from './fetch-recent-products.controller';
import { GetProductByIdController } from './get-product-by-id.controller';
import { GetModelByIdController } from './get-model-by-id.controller';
import { UpdateAvailableProductController } from './update-available-product.controller';
import { CreateModelService } from './create-model.service';
import { DeleteModelService } from './delete-model.service';
import { DeleteProductService } from './delete-product.service';
import { EditModelService } from './edit-model.service';
import { EditProductService } from './edit-product.service';
import { FetchRecentModelsService } from './fetch-recent-models.service';
import { FetchRecentProductsService } from './fetch-recent-products.service';
import { GetProductByIdService } from './get-product-by-id.service';
import { GetModelByIdService } from './get-model-by-id.service';
import { UpdateAvailableProductService } from './update-available-product.service';
import { ModelsRepository } from './models.repository';

@Module({
  imports: [],
  controllers: [CreateProductController, CreateModelController, DeleteModelController, DeleteProductController, EditModelController, EditProductController, FetchRecentModelsController, FetchRecentProductsController, GetProductByIdController, GetModelByIdController, UpdateAvailableProductController],
  providers: [PrismaService, CreateProductService, CreateModelService, DeleteModelService, DeleteProductService, EditModelService, EditProductService, FetchRecentModelsService, FetchRecentProductsService, GetProductByIdService, GetModelByIdService, UpdateAvailableProductService, ProductsRepository, ModelsRepository],
})
export class AppModule {}
