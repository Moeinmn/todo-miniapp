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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    default: false,
  })
  isCompleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // NOTE: Normally I would use enum but apparently SQLite doesn't support it
  // @Column({
  //   type: 'enum',
  //   enum: TaskStatus,
  //   default: TaskStatus.IN_PROGRESS, // Default status is IN_PROGRESS
  // }) // Column for the task status, using the TaskStatus enum
  // status: TaskStatus;
}
