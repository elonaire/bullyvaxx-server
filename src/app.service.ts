import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  SCHOOLS_REPOSITORY,
  SPONSORSHIPS_REPOSITORY,
  USERS_REPOSITORY,
} from './constants';
import {
  School,
  SchoolDto,
  Sponsorship,
  SponsorshipDto,
} from './users/user.entity';
import { UserInfo } from './users/users.service';
import { v4 as uuidGenerator } from 'uuid';

@Injectable()
export class AppService {
  constructor(
    @Inject(SPONSORSHIPS_REPOSITORY)
    private sponsorshipsRepository: typeof Sponsorship,
    @Inject(SCHOOLS_REPOSITORY) private schoolsRepository: typeof School
  ) {}
  getHello(): any {
    return {
      message: 'Hello World!',
    };
  }

  async getSponsorships(): Promise<SponsorshipDto[]> {
    return await this.sponsorshipsRepository.findAll<Sponsorship>();
  }

  async createSponsorship(sponsorship: {
    userInfo: UserInfo;
    form: any;
  }): Promise<SponsorshipDto[]> {
    console.log('userInfo', sponsorship.userInfo);
    if (!sponsorship?.form) {
      throw new HttpException(
        'Invalid form',
        HttpStatus.BAD_REQUEST,
      );
    }
    
    return await Promise.all(
      (sponsorship?.form?.schoolsArray as any[]).map(async school => {
        let school_id = uuidGenerator();
      const sponsorship_id = uuidGenerator();
  
      const { name, zip_code } = school;
      const schoolBody: SchoolDto = {
        zip_code: sponsorship?.form[zip_code],
        school_name: sponsorship?.form[name],
        school_id,
      };
  
      const schoolExists: School = await this.schoolsRepository.findOne({where: {zip_code, school_name: name}});
      if (!schoolExists) {
        const school: School = await this.schoolsRepository.create<School>(schoolBody);
        school_id = school.school_id;
      }
      
      const sponsorshipBody: SponsorshipDto = {
        expiry: `${new Date().setDate(new Date().getDate() + 30)}`,
        quantity: '1',
        user_id: sponsorship.userInfo?.user?.user_id,
        school_id,
        sponsorship_id,
      };
      const createdSponsorship = await this.sponsorshipsRepository.create<Sponsorship>(
        sponsorshipBody
      );
  
      return createdSponsorship;
      })
    )
  }
}
