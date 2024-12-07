import { Injectable } from '@nestjs/common';
import { ModelService } from 'src/infrastructure/model/model.service';

@Injectable()
export class TasksService {
  constructor(private readonly modelService: ModelService) {}

  // Get all tasks
  async getAllTasks() {
    return this.modelService.getAllTasks();
  }

  // Get task by ID
  async getTaskById(id: number) {
    return this.modelService.getTaskById(id);
  }

  // Create a new task
  async createTask(title: string, description: string) {
    return this.modelService.createTask(title, description);
  }

  // Edit task
  async editTask(id: number, title: string, description: string) {
    return this.modelService.editTask(id, title, description);
  }

  // Mark task as completed
  async markTaskComplete(id: number) {
    return this.modelService.markTaskComplete(id);
  }

  // Delete task
  async deleteTask(id: number) {
    return this.modelService.deleteTask(id);
  }
}
