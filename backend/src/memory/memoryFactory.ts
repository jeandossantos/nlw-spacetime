import { MemoryController } from './memoryController';
import { MemoryRepository } from './memoryRepository';
import { MemoryService } from './memoryService';

export default class MemoryFactory {
  static getInstance() {
    const repository = new MemoryRepository();
    const service = new MemoryService(repository);
    const controller = new MemoryController(service);

    return controller;
  }
}
