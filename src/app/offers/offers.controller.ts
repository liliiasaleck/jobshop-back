import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/app/auth/get-user.decorator';
import User from 'src/app/auth/user.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { GetOfferDto } from './dto/get-offer-dto';
import { Offer } from './offer.entity';
import { OffersService } from './offers.service';

@Controller('offers')

export class OffersController {
  constructor(private offersService: OffersService) {}

  @Get()
  getAllOffers(@Query()getOfferDto: GetOfferDto): Promise<Offer[]> {
    return this.offersService.getAllOffers(getOfferDto);
  }

  @Get(':id')
  getOfferByID(@Param('id') id: string): Promise<Offer>{
    return this.offersService.getOfferById(id)
  }

  @Post()@UseGuards(AuthGuard())
  createOffer(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offersService.createOffer(createOfferDto);
  }
}
