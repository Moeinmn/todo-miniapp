// types/task.ts

// Represents the task entity (from the backend)
export interface TaskDto {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
  }
  
  // For creating a new task (when sending data to the backend)
  export interface CreateTaskDto {
    title: string;
    description: string;
    isCompleted: boolean;
  }
  
  // For updating an existing task (optional fields)
  export interface UpdateTaskDto {
    title?: string;
    description?: string;
    isCompleted?: boolean;
  }
  
  