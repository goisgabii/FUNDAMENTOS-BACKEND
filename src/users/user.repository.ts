
import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

export type UserWithProfile = Prisma.UserGetPayload<{
  include: {
    profile: true;
  };
}>;

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findManyRecent(): Promise<Prisma.UserUncheckedCreateInput[] | null> {
    return await this.prisma.user.findMany();
  }

  async findById(id: string): Promise<UserWithProfile | null> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findMany(): Promise<Prisma.UserUncheckedCreateInput[] | null> {
    return await this.prisma.user.findMany();
  }

  async save(data: User): Promise<void> {
    await Promise.all([
      this.prisma.user.update({
        where: {
          id: data.id?.toString(),
        },
        data,
      }),
    ]);
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async create(data: Prisma.UserUncheckedCreateInput): Promise<void> {
    await this.prisma.user.create({
      data,
    });
  }

  async delete(user: User): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: user.id?.toString(),
      },
    });
  }
}
