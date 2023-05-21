import { PrismaClient } from '@prisma/client';
import { getPrismaInstance } from '../database/prisma';
import { CreateUserData } from './@types/repositoryTypes';

export class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = getPrismaInstance();
  }

  async create(data: CreateUserData) {
    return await this.prisma.user.create({
      data,
    });
  }

  async getByGithubId(githubId: number) {
    return await this.prisma.user.findUnique({
      where: {
        githubId,
      },
    });
  }
}
