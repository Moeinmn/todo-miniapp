import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { ModelService } from 'src/infrastructure/model/model.service';
import { ModelModule } from 'src/infrastructure/model/model.module';

@Module({
  imports: [ModelModule],
  providers: [TasksService, ModelService],
  controllers: [TasksController],
})
export class TasksModule {}
