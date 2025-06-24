
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProductsRepository } from "../products.repository";

interface DeleteProductServiceRequest {
  id: string;
}

@Injectable()
export class DeleteProductService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ id }: DeleteProductServiceRequest): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new HttpException("Product not found.", HttpStatus.NOT_FOUND);
    }

    await this.productsRepository.delete(product);
  }
}
