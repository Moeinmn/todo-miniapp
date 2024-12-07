export interface TaskDto {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
  }
  

  export interface CreateTaskDto {
    title: string;
    description: string;
    isCompleted: boolean;
  }
  

  export interface UpdateTaskDto {
    title?: string;
    description?: string;
    isCompleted?: boolean;
  }
  
  