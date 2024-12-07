// services/taskService.ts

import axios from 'axios';
import { CreateTaskDto, UpdateTaskDto, TaskDto } from '../types/taskTypes';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API, // Replace with your actual base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all tasks
export const getTasks = async (): Promise<TaskDto[]> => {
  const response = await axiosInstance.get('/v1/tasks');
  return response.data;
};

// Create a new task
export const createTask = async (taskData: CreateTaskDto): Promise<TaskDto> => {
  const response = await axiosInstance.post('/v1/tasks', taskData);
  return response.data;
};

// Get a task by ID
export const getTaskById = async (id: number): Promise<TaskDto> => {
  const response = await axiosInstance.get(`/v1/tasks/${id}`);
  return response.data;
};

// Update a task
export const updateTask = async (id: number, taskData: UpdateTaskDto): Promise<TaskDto> => {
  const response = await axiosInstance.patch(`/v1/tasks/${id}`, taskData);
  return response.data;
};

// Delete a task
export const deleteTask = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/v1/tasks/${id}`);
};

// Mark a task as completed
export const completeTask = async (id: number): Promise<TaskDto> => {
  const response = await axiosInstance.patch(`/v1/tasks/${id}/complete`);
  return response.data;
};
