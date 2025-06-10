import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Category } from "@prisma/client";

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  inStock: number;
  isAvailable: Boolean;
  category: Category;
  tags: string[];
  createdAt: string | Date | undefined;
  updatedAt: string | Date | null | undefined;
}

interface CreateProductServiceRequest {
  name: string;
  description?: string;
  price: number;
  inStock: number;
  isAvailable: boolean;
  category: Category;
  tags: string[];
}

type CreateProductServiceResponse = {
  product: Product;
}

@Injectable()
export class CreateProductService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    name,
    description,
    price,
    inStock,
    isAvailable,
    category,
    tags,
  }: CreateProductServiceRequest): Promise<CreateProductServiceResponse> {
    const productWithSameName = await this.productsRepository.findByName(name);

    if (productWithSameName) {
      throw new Error("Product already exists");
    }

    const product = {
      name,
      description,
      price,
      inStock,
      isAvailable,
      category,
      tags,
    };

    const newProduct = await this.productsRepository.create(product);

    return {
      product: {
        id: newProduct.id?.toString() || "",
        name,
        description,
        price,
        inStock,
        isAvailable,
        category,
        tags,
        createdAt: newProduct.createdAt,
        updatedAt: newProduct.updatedAt
      }
    };
  }
}