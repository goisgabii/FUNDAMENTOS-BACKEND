import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersRepository } from "./user.repository";

interface DeleteUserServiceRequest {
  id: string;
}

@Injectable()
export class DeleteUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: DeleteUserServiceRequest): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new HttpException("User not found.", HttpStatus.NOT_FOUND);
    }

    await this.usersRepository.delete(user);
  }
}