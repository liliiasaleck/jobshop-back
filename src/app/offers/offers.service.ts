import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OffersRepository } from './offers.reporitory';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './offer.entity';
import { GetOfferDto } from './dto/get-offer-dto';
import { LogoService } from './logo.service';
import Logo from './logo.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(OffersRepository)
    private offersRepository: OffersRepository,
    private logoService: LogoService
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

  createOffer(createOfferDto: CreateOfferDto, logo: Logo): Promise<Offer> {
    return this.offersRepository.createOffer(createOfferDto, logo);
  }

  async addLogo(id :number, imageBuffer: Buffer, filename: string) {
    const logo = await this.logoService.uploadLogo(imageBuffer, filename);
    return logo;
  }
}
