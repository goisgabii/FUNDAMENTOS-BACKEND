
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersRepository } from "./user.repository";

interface EditUserServiceRequest {
  email: string;
  id: string;
}

@Injectable()
export class EditUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, id }: EditUserServiceRequest): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new HttpException("User not found.", HttpStatus.NOT_FOUND);
    }

    user.email = email;

    await this.usersRepository.update(id, { email });
  }
}
