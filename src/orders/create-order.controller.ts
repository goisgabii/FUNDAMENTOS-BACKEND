import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { CreateOrderService } from "src/orders/create-order.service";

const orderItemSchema = z.object({
  productId: z.string().uuid({}),
  quantity: z.number().int(),
});

const createOrderBodySchema = z.object({
  userId: z.string().uuid(),
  orderItems: z.array(orderItemSchema).min(1),
});

const bodyValidationPipe = new ZodValidationPipe(createOrderBodySchema);

type CreateOrderBodySchema = z.infer<typeof createOrderBodySchema>;

@Controller("/orders")
export class CreateOrderController {
  constructor(private createOrder: CreateOrderService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateOrderBodySchema) {
    const { userId, orderItems } = body;

    await this.createOrder.execute({ userId, orderItems });
  }
}