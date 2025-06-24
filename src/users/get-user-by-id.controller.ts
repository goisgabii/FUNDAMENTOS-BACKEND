
import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { GetUserByIdService } from "./get-user-by-id.service";

@Controller("/users/:id")
export class GetUserByIdController {
  constructor(private getUserById: GetUserByIdService) {}

  @Get()
  @HttpCode(200)
  async handle(@Param("id") id: string) {
    const user = await this.getUserById.execute({
      id,
    });

    return {
      user,
    };
  }
}
