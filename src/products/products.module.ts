
import { Module } from "@nestjs/common";
import { CreateProductController } from "./create-product.controller";
import { CreateProductService } from "../create-product.service";
import { ProductsRepository } from "../products.repository";
import { DeleteProductController } from "./delete-product.controller";
import { DeleteProductService } from "./delete-product.service";
import { EditProductController } from "./edit-product.controller";
import { EditProductService } from "./edit-product.service";
import { FetchRecentProductsService } from "../fetch-recent-products.service";
import { FetchRecentProductsController } from "./fetch-recent-products.controller";
import { GetProductByIdController } from "./get-product-by-id.controller";
import { GetProductByIdService } from "./get-product-by-id.service";
import { UpdateAvailableProductController } from "../update-available-product.controller";
import { UpdateAvailableProductService } from "../update-available-product.service";
import { PrismaService } from "src/prisma.service";
import { ModelsRepository } from "src/models.repository";

@Module({
  controllers: [
    CreateProductController,
    DeleteProductController,
    EditProductController,
    FetchRecentProductsController,
    GetProductByIdController,
    UpdateAvailableProductController,
  ],
  providers: [
    UpdateAvailableProductService,
    GetProductByIdService,
    FetchRecentProductsService,
    CreateProductService,
    ProductsRepository,
    DeleteProductService,
    EditProductService,
    PrismaService,
    ModelsRepository,
  ],
})
export class ProductsModule {}
