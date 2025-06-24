import { Body, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { z } from "zod";
import { EditUserService } from "./edit-user.service";

const editUserBodySchema = z.object({
  email: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(editUserBodySchema);

type EditUserBodySchema = z.infer<typeof editUserBodySchema>;

@Controller("/users/:id")
export class EditUserController {
  constructor(private editUser: EditUserService) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditUserBodySchema,
    @Param("id") id: string
  ) {
    const { email } = body;

    await this.editUser.execute({
      email,
      id,
    });
  }
}