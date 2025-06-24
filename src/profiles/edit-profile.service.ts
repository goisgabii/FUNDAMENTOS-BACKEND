import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProfilesRepository } from "./profiles.repository";

interface EditProfileServiceRequest {
  id: string;
  avatarUrl: string;
}

@Injectable()
export class EditProfileService {
  constructor(private profilesRepository: ProfilesRepository) {}

  async execute({ avatarUrl, id }: EditProfileServiceRequest): Promise<void> {
    const profile = await this.profilesRepository.findById(id);

    if (!profile) {
      throw new HttpException("Profile not found.", HttpStatus.NOT_FOUND);
    }

    profile.avatarUrl = avatarUrl;

    await this.profilesRepository.update(id, { avatarUrl });
  }
}