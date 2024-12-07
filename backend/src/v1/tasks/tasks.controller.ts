import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, TaskDto, UpdateTaskDto } from './dtos/task.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller({
  path: 'tasks',
  version: '1',
})
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // Get all tasks
  @Get()
  async getAllTasks(): Promise<TaskDto[]> {
    return await this.tasksService.getAllTasks();
  }

  // Get task by ID
  @Get(':id')
  async getTask(@Param('id') id: number): Promise<TaskDto> {
    return await this.tasksService.getTaskById(id);
  }

  // Create a new task
  @ApiBody({
    type: CreateTaskDto,
  })
  @Post()
  async createTask(
    @Body() body: { title: string; description: string },
  ): Promise<TaskDto> {
    const { title, description } = body;
    return this.tasksService.createTask(title, description);
  }

  // Edit an existing task
  @ApiBody({
    type: UpdateTaskDto,
  })
  @Patch(':id')
  async editTask(
    @Param('id') id: number,
    @Body() body: { title: string; description: string },
  ): Promise<TaskDto> {
    const { title, description } = body;
    return await this.tasksService.editTask(id, title, description);
  }

  // Mark task as completed
  @Patch(':id/complete')
  async markTaskComplete(@Param('id') id: number): Promise<TaskDto> {
    return await this.tasksService.markTaskComplete(id);
  }

  // Delete a task
  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<TaskDto> {
    return await this.tasksService.deleteTask(id);
  }
}
