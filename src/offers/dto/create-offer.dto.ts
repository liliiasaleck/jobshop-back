import { IsNotEmpty } from 'class-validator';

export class CreateOfferDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  salaryFrom: number;
  @IsNotEmpty()
  salaryTo: number;
  @IsNotEmpty()
  location: string;
  @IsNotEmpty()
  tech: string;
  @IsNotEmpty()
  logo: string;
  @IsNotEmpty()
  experience: string;
  @IsNotEmpty()
  companySize: number;
  @IsNotEmpty()
  companyName: string;
  @IsNotEmpty()
  employmentType: string;
  @IsNotEmpty()
  jobDescription: string;
  @IsNotEmpty()
  aboutCompany: string;
}
