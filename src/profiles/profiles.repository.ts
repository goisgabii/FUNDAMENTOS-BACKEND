
import { Injectable } from "@nestjs/common";
import { Prisma, Profile } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

export type ProfileWithUser = Prisma.ProfileGetPayload<{
  include: {
    user: true;
  };
}>;

@Injectable()
export class ProfilesRepository {
  constructor(private prisma: PrismaService) {}

  async findManyRecent(): Promise<Prisma.ProfileUncheckedCreateInput[] | null> {
    return await this.prisma.profile.findMany();
  }

  async findById(id: string): Promise<ProfileWithUser | null> {
    return await this.prisma.profile.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
  }

  async findMany(): Promise<Prisma.ProfileUncheckedCreateInput[] | null> {
    return await this.prisma.profile.findMany();
  }

  async save(data: Profile): Promise<void> {
    await Promise.all([
      this.prisma.profile.update({
        where: {
          id: data.id?.toString(),
        },
        data,
      }),
    ]);
  }

  async update(id: string, data: Prisma.ProfileUpdateInput): Promise<Profile> {
    return this.prisma.profile.update({
      where: { id },
      data,
    });
  }

  async create(data: Prisma.ProfileUncheckedCreateInput): Promise<void> {
    await this.prisma.profile.create({
      data,
    });
  }

  async delete(profile: Profile): Promise<void> {
    await this.prisma.profile.delete({
      where: {
        id: profile.id?.toString(),
      },
    });
  }
}
