import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// export enum TaskStatus {
//   IN_PROGRESS = 'IN_PROGRESS',
//   COMPLETED = 'COMPLETED',
// }

@Entity()
export class Task {
  @PrimaryGeneratedColumn() // Auto-incremented primary key for the 'id'
  id: number;

  @Column() // Column for the task title
  title: string;

  @Column() // Column for the task description
  description: string;

  @Column({
    default: false, // Default status is False
  })
  isCompleted: boolean;

  @CreateDateColumn() // Automatically sets the creation timestamp
  createdAt: Date;

  @UpdateDateColumn() // Automatically updates the timestamp on entity update
  updatedAt: Date;

  // NOTE: Normally I would use enum but apparently SQLite doesn't support it
  // @Column({
  //   type: 'enum',
  //   enum: TaskStatus,
  //   default: TaskStatus.IN_PROGRESS, // Default status is IN_PROGRESS
  // }) // Column for the task status, using the TaskStatus enum
  // status: TaskStatus;
}
