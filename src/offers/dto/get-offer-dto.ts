import { IsNotEmpty } from 'class-validator';

export class GetOfferDto {
  title: string;
  salaryFrom: number;
  salaryTo: number;
  location: string;
  tech: string;
  logo: string;
  experience: string;
  companySize: number;
  companyName: string;
  employmentType: string;
  jobDescription: string;
  aboutCompany: string;
}
