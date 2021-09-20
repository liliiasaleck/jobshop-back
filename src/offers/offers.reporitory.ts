import { EntityRepository, Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { GetOfferDto } from './dto/get-offer-dto';
import { Offer } from './offer.entity';

@EntityRepository(Offer)
export class OffersRepository extends Repository<Offer> {
  async getAllOffers(getOfferDto: GetOfferDto): Promise<Offer[]> {
    const {search} = getOfferDto;
    const query = this.createQueryBuilder('offer');

    if (search) {
      query.andWhere(
        'LOWER(offer.title) LIKE LOWER(:search) OR LOWER(offer.jobDescription) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }
    const offer = await query.getMany();
    return offer;
  }

  async createOffer(createOfferDto: CreateOfferDto): Promise<Offer> {
    const {
      title,
      salaryFrom,
      salaryTo,
      location,
      tech,
      logo,
      experience,
      companySize,
      companyName,
      employmentType,
      jobDescription,
      aboutCompany,
    } = createOfferDto;

    const offer = this.create({
      title,
      salaryFrom,
      salaryTo,
      location,
      tech,
      logo,
      experience,
      companySize,
      companyName,
      employmentType,
      jobDescription,
      aboutCompany,
    });
    await this.save(offer);
    return offer;
  }
}
