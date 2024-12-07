import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task as TaskEntity } from './entities/task.entity'; // Import your entity
import { TaskDto } from 'src/v1/tasks/dtos/task.dto';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(TaskEntity) // Inject the Task entity repository
    private taskRepository: Repository<TaskEntity>,
  ) {}

  // Convert entity to Task class instance
  private toTask(taskEntity: TaskEntity): TaskDto {
    return new TaskDto(taskEntity); // Use the constructor of your Task class to map the entity
  }

  // Get all tasks
  async getAllTasks(): Promise<TaskDto[]> {
    const taskEntities = await this.taskRepository.find();
    return taskEntities.map(this.toTask); // Map each entity to the Task class instance
  }

  // Get task by ID
  async getTaskById(id: number): Promise<TaskDto> {
    const taskEntity = await this.taskRepository.findOneBy({ id });
    return taskEntity ? this.toTask(taskEntity) : null; // Convert entity to Task class instance
  }

  // Create a new task
  async createTask(title: string, description: string): Promise<TaskDto> {
    const newTaskEntity = this.taskRepository.create({
      title,
      description,
      isCompleted: false, // Default task is not completed
    });
    const savedTaskEntity = await this.taskRepository.save(newTaskEntity);
    return this.toTask(savedTaskEntity); // Convert to Task class instance before returning
  }

  // Edit task
  async editTask(
    id: number,
    title: string,
    description: string,
  ): Promise<TaskDto> {
    const taskEntity = await this.getTaskById(id);
    if (taskEntity) {
      taskEntity.title = title;
      taskEntity.description = description;
      const updatedTaskEntity = await this.taskRepository.save(taskEntity);
      return this.toTask(updatedTaskEntity); // Convert to Task class instance before returning
    }
    return null;
  }

  // Mark task as completed
  async markTaskComplete(id: number): Promise<TaskDto> {
    const taskEntity = await this.getTaskById(id);
    if (taskEntity) {
      taskEntity.isCompleted = !taskEntity.isCompleted;
      const updatedTaskEntity = await this.taskRepository.save(taskEntity);
      return this.toTask(updatedTaskEntity); // Convert to Task class instance before returning
    }
    throw new Error(`Task with ID ${id} not found.`);
  }

  // Delete task
  async deleteTask(id: number): Promise<void> {
    const taskEntity = await this.taskRepository.findOneBy({ id });
    if (taskEntity) {
      await this.taskRepository.remove(taskEntity);
    }
  }
}
