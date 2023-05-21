import { CustomException } from '../exceptions/CustomException';
import { CreateMemoryDto, UpdateMemoryDto } from './@types/memoryDto';
import { MemoryRepository } from './memoryRepository';
import { z as zod } from 'zod';
export class MemoryService {
  constructor(private readonly memoryRepository: MemoryRepository) {}

  async getAll() {
    return (await this.memoryRepository.getAll()).map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat('...'),
      };
    });
  }

  async getById(id: string) {
    const mySchema = zod.object({
      id: zod.string().uuid(),
    });

    const { id: memoryId } = mySchema.parse(id);

    const memory = await this.memoryRepository.getById(memoryId);

    if (!memory?.isPublic && memory?.id !== memoryId) {
      throw new CustomException('Unauthorized', 401);
    }
  }

  async create(dto: CreateMemoryDto) {
    const mySchema = zod.object({
      content: zod.string(),
      coverUrl: zod.string(),
      isPublic: zod.coerce.boolean().default(false),
    });

    const { content, coverUrl, isPublic } = mySchema.parse(dto);

    const memory = await this.memoryRepository.create({
      content,
      coverUrl,
      isPublic,
      userId: '',
    });

    return memory;
  }

  async update(id: string, dto: UpdateMemoryDto) {
    const mySchemaId = zod.object({
      id: zod.string().uuid(),
    });

    const { id: memoryId } = mySchemaId.parse(mySchemaId);

    const mySchema = zod.object({
      content: zod.string(),
      coverUrl: zod.string(),
      isPublic: zod.coerce.boolean().default(false),
    });

    const { content, coverUrl, isPublic } = mySchema.parse(dto);

    const memory = await this.memoryRepository.update(memoryId, {
      content,
      coverUrl,
      isPublic,
    });

    return memory;
  }

  async delete(id: string) {
    const mySchema = zod.object({
      id: zod.string().uuid(),
    });

    const { id: memoryId } = mySchema.parse(id);

    return await this.memoryRepository.delete(memoryId);
  }
}
