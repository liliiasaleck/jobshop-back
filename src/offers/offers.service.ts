import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OffersRepository } from './offers.reporitory';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './offer.entity';
import { GetOfferDto } from './dto/get-offer-dto';
import User from 'src/auth/user.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(OffersRepository)
    private offersRepository: OffersRepository,
  ) {}

  getAllOffers(getOfferDto: GetOfferDto): Promise<Offer[]> {
    return this.offersRepository.getAllOffers(getOfferDto);
  }

  async getOfferById(id): Promise<Offer> {
    const found = await this.offersRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Offer with ID "${id}" not found`);
    }
    return found;
  }

  createOffer(createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offersRepository.createOffer(createOfferDto)
  }

}
