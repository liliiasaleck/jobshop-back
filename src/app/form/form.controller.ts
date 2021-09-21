import { Body, Controller, Post } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { Form } from './form.entity';
import { FormService } from './form.service';

@Controller('form')
export class FormController {
  constructor(private formService: FormService) {}
  @Post()
  createForm(@Body() createFormDto: CreateFormDto): Promise<Form> {
    return this.formService.createForm(createFormDto);
  }
}
