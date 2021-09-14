import { Test } from '@nestjs/testing';
import { OffersService } from './offers/offers.service';
import { OffersRepository } from './offers/offers.reporitory';
import { OffersModule } from './offers/offers.module';

const mockOffersRepository = () => ({
  getAllOffers: jest.fn(),
});

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
    it('calls OffersRrepository.getAllOffers and returns the result', () => {
      expect(offersRepository.getAllOffers).not.toHaveBeenCalled();
      offersRepository.getAllOffers.mockResolvedValue('someValue');
      const result = offersService.getAllOffers(null);
      expect(offersRepository.getAllOffers).toHaveBeenCalled();
      expect(result).toEqual('...something');
    });
  });
});
