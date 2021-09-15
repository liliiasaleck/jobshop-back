import { Test } from '@nestjs/testing';
import { OffersService } from './offers/offers.service';
import { OffersRepository } from './offers/offers.reporitory';
import { NotFoundException } from '@nestjs/common';

const mockOffersRepository = () => ({
  getAllOffers: jest.fn(),
  findOne: jest.fn(),
  createOffer: jest.fn(),

});

const mockOffer = {
  id: 'someId',
  title: 'Test',
  salaryFrom: 1,
  salaryTo: 2,
  location: 'Test',
  tech: 'Test',
  logo: 'Test',
  experience: 'Test',
  companySize: 3,
  companyName: 'Test',
  employmentType: 'Test',
  jobDescription: 'Test',
  aboutCompany: 'Test',
};

describe('OffersService', () => {
  let offersService: OffersService;
  let offersRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        OffersService,
        { provide: OffersRepository, useFactory: mockOffersRepository },
      ],
    }).compile();

    offersService = module.get(OffersService);
    offersRepository = module.get(OffersRepository);
  });

  describe('getAllOffers', () => {
    it('calls OffersRrepository.getAllOffers and returns the result', async () => {
      offersRepository.getAllOffers.mockResolvedValue('someValue');
      const result = await offersService.getAllOffers(null);
      expect(result).toEqual('someValue');
    });
  });


  describe('getOfferById', () => {
    it('calls TasksRepository.findOne and returns the result', async () => {

      offersRepository.findOne.mockResolvedValue(mockOffer);
      const result = await offersService.getOfferById('someId');
      expect(result).toEqual(mockOffer);
    });

    it('calls TasksRepository.findOne and handles an error', async () => {
      offersRepository.findOne.mockResolvedValue(null);
      expect(offersService.getOfferById('someId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createOffer', () => {
    it('calls OffersRrepository.createOffer and returns the result', async () => {
      
      offersRepository.createOffer.mockResolvedValue('createdOffer');
      const result = await offersService.createOffer(mockOffer);
      expect(result).toEqual('createdOffer');
    });
  });
});
