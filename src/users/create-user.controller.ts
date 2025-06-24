import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { CreateUserService } from "./create-user.service";

const createUserBodySchema = z.object({
  email: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(createUserBodySchema);

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

@Controller("/users")
export class CreateUserController {
  constructor(private createUser: CreateUserService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateUserBodySchema) {
    const { email } = body;

    await this.createUser.execute({
      email,
    });
  }
}