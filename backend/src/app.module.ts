import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './v1/tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelModule } from './infrastructure/model/model.module';
//import { ModelService } from './infrastructure/model/model.service';
// import { Task } from './infrastructure/model/entities/task.entity';

@Module({
  imports: [
    TasksModule,
    ModelModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/db.sqlite', // Path to SQLite database file
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Path to your entity files
      //entities: [Task],
      synchronize: true, // Automatically create database schema (for development only)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
