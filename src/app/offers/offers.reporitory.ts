import { EntityRepository, Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { GetOfferDto } from './dto/get-offer-dto';
import { EmploymentType } from './models/employmentType.model';
import { ExperienceType } from './models/experience.model';
import { LocationType } from './models/location.model';
import { TechType } from './models/tech.model';
import { Offer } from './offer.entity';

@EntityRepository(Offer)
export class OffersRepository extends Repository<Offer> {
  async getAllOffers(getOfferDto: GetOfferDto): Promise<Offer[]> {
    const { search, location, tech, experience, employmentType } = getOfferDto;
    const salaryFrom = Number(getOfferDto.salaryFrom);
    const salaryTo = Number(getOfferDto.salaryTo);
    const query = this.createQueryBuilder('offer');

    if (location) {
      query.andWhere('LOWER(offer.location) LIKE LOWER(:location)', {
        location,
      });
    }
    if (tech) {
      query.andWhere('LOWER(offer.tech) LIKE LOWER(:tech)', { tech });
    }
    if (experience ) {
      query.andWhere('LOWER(offer.experience) LIKE LOWER(:experience)', {
        experience,
      });
    }
    if (employmentType ) {
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
      query.andWhere('offer.salaryFrom >= :salaryFrom', { salaryFrom });
    }
    if (salaryTo) {
      query.andWhere('offer.salaryTo <= :salaryTo', { salaryTo });
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
      experience,
      companySize,
      companyName,
      employmentType,
      jobDescription,
      aboutCompany,
      webSite,
      longitude,
      latitude,
    } = createOfferDto;

    const offer = this.create({
      title,
      salaryFrom,
      salaryTo,
      location,
      tech,
      experience,
      companySize,
      companyName,
      employmentType,
      jobDescription,
      aboutCompany,
      webSite,
      longitude,
      latitude,
      
    });
    await this.save(offer);
    return offer;
  }
}
