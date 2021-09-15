import { Test } from '@nestjs/testing';
import { FormService } from './form.service';
import { FormRepository } from './form.repository';

const mockFormRepository = () => ({
  createForm: jest.fn(),

});

const mockForm = {
  fullName: 'ariel black',
  email: 'ariel@com',
  about: 'info',
  resume:'cv'
};

describe('FormService', () => {
  let formService: FormService;
  let formRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FormService,
        { provide: FormRepository, useFactory: mockFormRepository },
      ],
    }).compile();

    formService = module.get(FormService);
    formRepository = module.get(FormRepository);
  });

  
  describe('createForm', () => {
    it('calls FormRepository.createForm and returns the result', async () => {
      formRepository.createForm.mockResolvedValue('createdForm');
      const result = await formService.createForm(mockForm);
      expect(result).toEqual('createdForm');
    });
  });
});
