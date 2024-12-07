'use client'

import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Pencil, Trash, X, Check } from 'lucide-react'
import { TaskDto } from '../types/taskTypes'

// interface Todo {
//   id: number
//   title: string
//   description: string
//   completed: boolean
// }

interface TodoItemProps {
  todo: TaskDto
  onToggle: (id: number) => void
  onEdit: (id: number, newTitle: string, newDescription: string) => void
  onRemove: (id: number) => void
}

export function TodoItem({ todo, onToggle, onEdit, onRemove }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description)

  const handleEdit = () => {
    if (editTitle.trim() !== todo.title || editDescription.trim() !== todo.description) {
      onEdit(todo.id, editTitle.trim(), editDescription.trim())
    }
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col gap-2 py-4 border-b">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={todo.isCompleted}
          onCheckedChange={() => onToggle(todo.id)}
          id={`todo-${todo.id}`}
        />
        {isEditing ? (
          <Input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-grow"
          />
        ) : (
          <label
            htmlFor={`todo-${todo.id}`}
            className={`flex-grow font-medium ${todo.isCompleted ? 'line-through text-gray-500' : ''}`}
          >
            {todo.title}
          </label>
        )}
        {isEditing ? (
          <>
            <Button size="icon" onClick={handleEdit}>
              <Check className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" onClick={() => setIsEditing(false)}>
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button size="icon" variant="outline" onClick={() => setIsEditing(true)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" onClick={() => onRemove(todo.id)}>
              <Trash className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
      {isEditing ? (
        <Textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="w-full mt-2"
        />
      ) : (
        <p className={`text-sm ${todo.isCompleted ? 'text-gray-500' : 'text-gray-700'}`}>
          {todo.description}
        </p>
      )}
    </div>
  )
}

