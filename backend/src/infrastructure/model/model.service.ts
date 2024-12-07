import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task as TaskEntity } from './entities/task.entity';
import { TaskDto } from 'src/v1/tasks/dtos/task.dto';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  private toTask(taskEntity: TaskEntity): TaskDto {
    return new TaskDto(taskEntity);
  }

  async getAllTasks(): Promise<TaskDto[]> {
    const taskEntities = await this.taskRepository.find();
    return taskEntities.map(this.toTask);
  }

  async getTaskById(id: number): Promise<TaskDto> {
    const taskEntity = await this.taskRepository.findOneBy({ id });
    return taskEntity ? this.toTask(taskEntity) : null;
  }

  async createTask(title: string, description: string): Promise<TaskDto> {
    const newTaskEntity = this.taskRepository.create({
      title,
      description,
      isCompleted: false,
    });
    const savedTaskEntity = await this.taskRepository.save(newTaskEntity);
    return this.toTask(savedTaskEntity);
  }

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
      return this.toTask(updatedTaskEntity);
    }
    return null;
  }

  async markTaskComplete(id: number): Promise<TaskDto> {
    const taskEntity = await this.getTaskById(id);
    if (taskEntity) {
      taskEntity.isCompleted = !taskEntity.isCompleted;
      const updatedTaskEntity = await this.taskRepository.save(taskEntity);
      return this.toTask(updatedTaskEntity);
    }
    throw new Error(`Task with ID ${id} not found.`);
  }

  async deleteTask(id: number): Promise<TaskDto> {
    const taskEntity = await this.taskRepository.findOneBy({ id });
    if (taskEntity) {
      const deletedTaskEntity = await this.taskRepository.remove(taskEntity);
      return this.toTask(deletedTaskEntity);
    }
  }
}
