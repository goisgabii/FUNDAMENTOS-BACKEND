import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ZodValidationPipe } from "./pipes/zod-validation-pipe";
import { z } from "zod";
import { CreateModelService } from "./create-model.service";

const createModelBodySchema = z.object({
  name: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(createModelBodySchema);

type CreateModelBodySchema = z.infer<typeof createModelBodySchema>;

@Controller('/models')
export class CreateModelController {
  constructor(private createModel: CreateModelService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateModelBodySchema) {
    const {
      name,
    } = body;

    await this.createModel.execute({
      name,
    });
  }
}