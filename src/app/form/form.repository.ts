import { EntityRepository, Repository } from 'typeorm';
import { CreateFormDto } from './dto/create-form.dto';
import { Form } from './form.entity';

@EntityRepository(Form)
export class FormRepository extends Repository<Form> {
  async createForm(createFormDto: CreateFormDto): Promise<Form> {
    const { fullName, email, about, resume } = createFormDto;

    const form = this.create({ fullName, email, about, resume });
    await this.save(form);
    return form;
  }
}
