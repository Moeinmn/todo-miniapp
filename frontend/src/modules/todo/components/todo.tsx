"use client";

import { useEffect, useState } from "react";
import { TodoItem } from "./todo-item";
import { AddTodo } from "./add-todo";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
} from "../services/taskServices";
import { CreateTaskDto, TaskDto} from "../types/taskTypes";

export default function TodoApp() {
  const [todos, setTodos] = useState<TaskDto[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const tasks = await getTasks();
        setTodos(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to fetch tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addTodo = async (title: string, description: string) => {
    const newTask: CreateTaskDto = { title, description, isCompleted: false };

    setLoading(true);
    setError(null);

    try {
      await createTask(newTask);

      const tasks = await getTasks();
      setTodos(tasks);
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Failed to add task.");
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id: number) => {
    setLoading(true);
    setError(null);
  
    try {
      await completeTask(id);
      const tasks = await getTasks();
      setTodos(tasks);
    } catch (error) {
      console.error("Error toggling task completion:", error);
      setError("Failed to toggle task completion.");
    } finally {
      setLoading(false);
    }
  };
  

  const editTodo = async (id: number, newTitle: string, newDescription: string) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (!todoToUpdate) return;

    setLoading(true);
    setError(null);

    try {
      await updateTask(id, { title: newTitle, description: newDescription });

      const tasks = await getTasks();
      setTodos(tasks);
    } catch (error) {
      console.error("Error editing task:", error);
      setError("Failed to edit task.");
    } finally {
      setLoading(false);
    }
  };

  const removeTodo = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await deleteTask(id);
      const tasks = await getTasks();
      setTodos(tasks);
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task.");
    } finally {
      setLoading(false);
    }
  };

  const pendingTodos = todos.filter((todo) => !todo.isCompleted);
  const completedTodos = todos.filter((todo) => todo.isCompleted);

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <AddTodo onAdd={addTodo} />
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Pending Tasks</h2>
        {pendingTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onEdit={editTodo}
            onRemove={removeTodo}
          />
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Completed Tasks</h2>
        {completedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onEdit={editTodo}
            onRemove={removeTodo}
          />
        ))}
      </div>
    </div>
  );
}
