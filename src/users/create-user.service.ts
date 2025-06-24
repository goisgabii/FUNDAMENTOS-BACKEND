import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersRepository } from "./user.repository";

interface CreateUserServiceRequest {
  email: string;
}

@Injectable()
export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email }: CreateUserServiceRequest): Promise<void> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new HttpException(
        "User with this email already exists.",
        HttpStatus.BAD_REQUEST
      );
    }

    const user = {
      email,
    };

    await this.usersRepository.create(user);
  }
}