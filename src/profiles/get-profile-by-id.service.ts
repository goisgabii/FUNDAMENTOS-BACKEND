
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProfilesRepository } from "./profiles.repository";
import { User } from "@prisma/client";

export interface Profile {
  id: string;
  avatarUrl: string | null;
  userId: string;
  createdAt: string | Date | undefined;
  updatedAt: string | Date | null | undefined;
  user: User;
}

interface GetProfileByIdServiceRequest {
  id: string;
}

type GetProfileByIdServiceResponse = {
  profile: Profile;
};

@Injectable()
export class GetProfileByIdService {
  constructor(private profilesRepository: ProfilesRepository) {}

  async execute({
    id,
  }: GetProfileByIdServiceRequest): Promise<GetProfileByIdServiceResponse> {
    const profile = await this.profilesRepository.findById(id);

    if (!profile) {
      throw new HttpException("Profile not found.", HttpStatus.NOT_FOUND);
    }

    const newProfile: Profile = {
      id: profile.id?.toString() || "",
      avatarUrl: profile.avatarUrl,
      userId: profile.userId,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
      user: profile.user,
    };

    return {
      profile: newProfile,
    };
  }
}
