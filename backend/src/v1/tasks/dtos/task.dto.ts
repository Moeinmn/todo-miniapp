import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { Exclude, Expose } from 'class-transformer'; // For transforming the response
import { ApiProperty } from '@nestjs/swagger';
//import { TaskStatus } from 'src/infrastructure/model/entities/task.entity';

export class TaskDto {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;

  constructor(task: Partial<TaskDto>) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.isCompleted = task.isCompleted;
  }
}

export class CreateTaskDto {
  @ApiProperty({ example: 'Buy groceries', description: 'Title of the task' })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Purchase vegetables, fruits, and milk',
    description: 'Detailed description of the task',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: false, description: 'Status of task completion' })
  @IsBoolean()
  isCompleted: boolean;
}

export class UpdateTaskDto {
  @ApiProperty({
    example: 'Buy Water',
    description: 'Updated title of the task',
    required: false, // Indicates that this field is optional
  })
  @IsOptional() // Optional in case the user doesn't want to update it
  @IsString()
  title?: string;

  @ApiProperty({
    example: 'Purchase watter',
    description: 'Updated detailed description of the task',
    required: false, // Indicates that this field is optional
  })
  @IsOptional() // Optional field
  @IsString()
  description?: string;

  @ApiProperty({
    example: true,
    description: 'Updated status of task completion',
    required: false, // Indicates that this field is optional
  })
  @IsOptional() // Optional field
  @IsBoolean()
  isCompleted?: boolean;
}

export class TaskResponseDto {
  @Exclude() // Exclude id from the response if you don't want to expose it
  id: number;

  @Expose() // Explicitly expose title in the response
  title: string;

  @Expose() // Explicitly expose description in the response
  description: string;

  @Expose() // Explicitly expose isCompleted in the response
  isCompleted: boolean;

  constructor(task: Partial<TaskDto>) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.isCompleted = task.isCompleted;
  }
}
