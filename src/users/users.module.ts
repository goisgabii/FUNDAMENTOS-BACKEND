
import { Module } from "@nestjs/common";
import { CreateUserController } from "./create-user.controller";
import { CreateUserService } from "./create-user.service";
import { PrismaService } from "src/prisma.service";
import { UsersRepository } from "./user.repository";
import { FetchUsersService } from "./fetch-users.service";
import { FetchUsersController } from "./fetch-users.controller";
import { GetUserByIdController } from "./get-user-by-id.controller";
import { GetUserByIdService } from "./get-user-by-id.service";
import { EditUserController } from "./edit-user.controller";
import { EditUserService } from "./edit-user.service";
import { DeleteUserController } from "./delete-user.controller";
import { DeleteUserService } from "./delete-user.service";

@Module({
  controllers: [
    CreateUserController,
    FetchUsersController,
    GetUserByIdController,
    EditUserController,
    DeleteUserController,
  ],
  providers: [
    CreateUserService,
    PrismaService,
    UsersRepository,
    FetchUsersService,
    GetUserByIdService,
    EditUserService,
    DeleteUserService,
  ],
})
export class UsersModule {}
