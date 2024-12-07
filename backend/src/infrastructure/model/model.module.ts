import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [ModelService],
  exports: [ModelService, TypeOrmModule],
})
export class ModelModule {}
