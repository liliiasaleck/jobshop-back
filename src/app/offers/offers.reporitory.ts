import { EntityRepository, Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { GetOfferDto } from './dto/get-offer-dto';
import { Offer } from './offer.entity';

@EntityRepository(Offer)
export class OffersRepository extends Repository<Offer> {
  async getAllOffers(getOfferDto: GetOfferDto): Promise<Offer[]> {
    const {
      search,
      location,
      tech,
      experience,
      employmentType,
      salaryFrom,
      salaryTo,
      map,
    } = getOfferDto;
    const query = this.createQueryBuilder('offer');

    if (location) {
      query.andWhere('LOWER(offer.location) LIKE LOWER(:location)', {
        location,
      });
    }
    if (tech) {
      query.andWhere('LOWER(offer.tech) LIKE LOWER(:tech)', { tech });
    }
    if (experience) {
      query.andWhere('LOWER(offer.experience) LIKE LOWER(:experience)', {
        experience,
      });
    }
    if (employmentType) {
      query.andWhere(
        'LOWER(offer.employmentType) LIKE LOWER(:employmentType)',
        { employmentType },
      );
    }
    if (search) {
      query.andWhere(
        'LOWER(offer.title) LIKE LOWER(:search) OR LOWER(offer.jobDescription) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }
    if (salaryFrom) {
      query.andWhere('offer.salaryFrom >= :salaryFrom', { salaryFrom});
    }
    if (salaryTo) {
      query.andWhere('offer.salaryTo <= :salaryTo', { salaryTo});
    }
    // if (map) {
      // query.andWhere('LOWER(offer.map) LIKE LOWER(:map)', { map});
    // }

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
