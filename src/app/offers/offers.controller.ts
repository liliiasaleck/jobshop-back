import { Body, Controller, Get, Param, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/app/auth/get-user.decorator';
import User from 'src/app/auth/user.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { GetOfferDto } from './dto/get-offer-dto';
import { LogoService } from './logo.service';
import { Offer } from './offer.entity';
import { OffersService } from './offers.service';

@Controller('offers')

export class OffersController {
  constructor(private offersService: OffersService,
    private logoService: LogoService) {}

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

  @Post('logo')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('logo'))
  async addLogo(@Req() request, @UploadedFile() file: Express.Multer.File) {
    return this.logoService.uploadLogo( file.buffer, file.originalname);
  }
}
