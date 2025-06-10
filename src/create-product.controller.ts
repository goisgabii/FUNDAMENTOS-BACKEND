import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ZodValidationPipe } from "./pipes/zod-validation-pipe";
import { z } from "zod";
import { CreateProductService } from "./create-product.service";
import { Category } from "@prisma/client";

const createProductBodySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  inStock: z.number(),
  isAvailable: z.boolean(),
  category: z.enum([Category.ELECTRONICS, Category.OTHER]),
  tags: z.array(z.string()),
});

const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema);

type CreateProductBodySchema = z.infer<typeof createProductBodySchema>;

@Controller('/products')
export class CreateProductController {
  constructor(private createProduct: CreateProductService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateProductBodySchema) {
    const {
      name,
      description,
      price,
      inStock,
      isAvailable,
      category,
      tags,
    } = body;

    const product = await this.createProduct.execute({
      name,
      description,
      price,
      inStock,
      isAvailable,
      category,
      tags,
    });

    return {
      product
    };
  }
}