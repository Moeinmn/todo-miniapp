import { Injectable } from '@nestjs/common';
import { ModelService } from 'src/infrastructure/model/model.service';

@Injectable()
export class TasksService {
  constructor(private readonly modelService: ModelService) {}

  async getAllTasks() {
    return this.modelService.getAllTasks();
  }

  async getTaskById(id: number) {
    return this.modelService.getTaskById(id);
  }

  async createTask(title: string, description: string) {
    return this.modelService.createTask(title, description);
  }

  async editTask(id: number, title: string, description: string) {
    return this.modelService.editTask(id, title, description);
  }

  async markTaskComplete(id: number) {
    return this.modelService.markTaskComplete(id);
  }

  async deleteTask(id: number) {
    return this.modelService.deleteTask(id);
  }
}
