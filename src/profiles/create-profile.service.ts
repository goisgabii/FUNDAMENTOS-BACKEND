
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProfilesRepository } from "./profiles.repository";
import { UsersRepository } from "src/users/user.repository";

interface CreateProfileServiceRequest {
  userId: string;
  avatarUrl: string;
}

@Injectable()
export class CreateProfileService {
  constructor(
    private profilesRepository: ProfilesRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
    avatarUrl,
  }: CreateProfileServiceRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new HttpException("User not found.", HttpStatus.NOT_FOUND);
    }

    if (user.profile) {
      throw new HttpException(
        "User already has a profile.",
        HttpStatus.BAD_REQUEST
      );
    }

    const profile = {
      userId,
      avatarUrl,
    };

    await this.profilesRepository.create(profile);
  }
}
