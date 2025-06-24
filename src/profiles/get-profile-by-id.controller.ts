
import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { GetProfileByIdService } from "./get-profile-by-id.service";

@Controller("/profiles/:id")
export class GetProfileByIdController {
  constructor(private getProfileById: GetProfileByIdService) {}

  @Get()
  @HttpCode(200)
  async handle(@Param("id") id: string) {
    const profile = await this.getProfileById.execute({
      id,
    });

    return {
      profile,
    };
  }
}
