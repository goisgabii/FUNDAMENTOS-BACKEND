
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./user.repository";

export interface User {
  id: string;
  email: string;
  createdAt: string | Date | undefined;
  updatedAt: string | Date | null | undefined;
}

type FetchUsersServiceResponse = {
  users: User[];
};

@Injectable()
export class FetchUsersService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<FetchUsersServiceResponse> {
    const users = await this.usersRepository.findMany();

    const mappedUsers: User[] = [];

    if (!users) {
      throw new Error("Users not found");
    }

    for (const user of users) {
      mappedUsers.push({
        id: user.id?.toString() || "",
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    }

    return {
      users: mappedUsers,
    };
  }
}
