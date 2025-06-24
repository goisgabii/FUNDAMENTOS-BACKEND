
import { Module } from "@nestjs/common";
import { CreateProfileController } from "./create-profile.controller";
import { CreateProfileService } from "./create-profile.service";
import { ProfilesRepository } from "./profiles.repository";
import { PrismaService } from "src/prisma.service";
import { UsersRepository } from "src/users/user.repository";
import { GetProfileByIdController } from "./get-profile-by-id.controller";
import { GetProfileByIdService } from "./get-profile-by-id.service";
import { EditProfileController } from "./edit-profile.controller";
import { EditProfileService } from "./edit-profile.service";

@Module({
  controllers: [
    CreateProfileController,
    GetProfileByIdController,
    EditProfileController,
  ],
  providers: [
    CreateProfileService,
    ProfilesRepository,
    PrismaService,
    UsersRepository,
    GetProfileByIdService,
    EditProfileService,
  ],
})
export class ProfilesModule {}
