
import { Controller, Get, HttpCode } from "@nestjs/common";
import { FetchUsersService } from "./fetch-users.service";

@Controller("/users")
export class FetchUsersController {
  constructor(private fetchUsers: FetchUsersService) {}

  @Get()
  @HttpCode(200)
  async handle() {
    const users = await this.fetchUsers.execute();

    return {
      users,
    };
  }
}
