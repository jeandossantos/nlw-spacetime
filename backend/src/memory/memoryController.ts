import { Request, Response } from 'express';
import { MemoryService } from './memoryService';

export class MemoryController {
  constructor(private readonly memoryService: MemoryService) {}

  async getAll(req: Request, res: Response) {
    const memories = await this.memoryService.getAll();

    return res.json(memories);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const memory = await this.memoryService.getById(id);

    return res.json(memory);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const memory = await this.memoryService.delete(id);

    return res.json(memory);
  }

  async create(req: Request, res: Response) {
    const { content, coverUrl, isPublic } = req.body;

    const memory = await this.memoryService.create({
      content,
      coverUrl,
      isPublic,
      userId: req.userId,
    });

    return res.json(memory);
  }

  async update(req: Request, res: Response) {
    const { content, coverUrl, isPublic } = req.body;
    const { id } = req.params;

    const memory = await this.memoryService.update(id, {
      content,
      coverUrl,
      isPublic,
    });

    return res.json(memory);
  }
}
