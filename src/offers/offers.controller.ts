import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateOfferDto } from './dto/create-offer.dto';
import { GetOfferDto } from './dto/get-offer-dto';
import { Offer } from './offer.entity';
import { OffersService } from './offers.service';

@Controller('offers')
// @UseGuards(AuthGuard())
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

  @Post()
  createOffer(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offersService.createOffer(createOfferDto);
  }
}
