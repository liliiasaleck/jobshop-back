import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormController } from './form.controller';
import { FormRepository } from './form.repository';
import { FormService } from './form.service';

@Module({
    imports: [TypeOrmModule.forFeature([FormRepository])],
    controllers: [FormController],
    providers: [FormService],
  })
export class FormModule {
    
}
