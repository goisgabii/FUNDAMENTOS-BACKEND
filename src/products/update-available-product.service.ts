
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";

interface UpdateAvailableProductServiceRequest {
  isAvailable: boolean;
  id: string;
}

@Injectable()
export class UpdateAvailableProductService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    id,
    isAvailable,
  }: UpdateAvailableProductServiceRequest): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new HttpException("Product not found.", HttpStatus.NOT_FOUND);
    }

    product.isAvailable = isAvailable;

    await this.productsRepository.save(product);
  }
}
