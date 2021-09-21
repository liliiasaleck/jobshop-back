import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFormDto } from './dto/create-form.dto';
import { Form } from './form.entity';
import { FormRepository } from './form.repository';


@Injectable()
export class FormService {
  constructor(
    @InjectRepository(FormRepository)
    private formRepository: FormRepository,
  ) {}

  
  createForm(createFormDto: CreateFormDto): Promise<Form> {
    return this.formRepository.createForm(createFormDto)
  }

}
