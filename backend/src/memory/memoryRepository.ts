import { PrismaClient } from '@prisma/client';
import { getPrismaInstance } from '../database/prisma';
import { CreateMemoryData, UpdateMemoryData } from './@types/repositoryTypes';

export class MemoryRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = getPrismaInstance();
  }

  async getAll() {
    return this.prisma.memories.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async getById(id: string) {
    return this.prisma.memories.findMany({
      where: {
        id,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async create({ content, coverUrl, isPublic, userId }: CreateMemoryData) {
    return await this.prisma.memories.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: userId || '',
      },
    });
  }

  async update(id: string, { content, coverUrl, isPublic }: UpdateMemoryData) {
    return await this.prisma.memories.update({
      data: {
        content,
        coverUrl,
        isPublic,
      },
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.memories.delete({
      where: { id },
    });
  }
}
