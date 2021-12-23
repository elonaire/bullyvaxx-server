import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LoginDetails } from './app.entity';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { SponsorshipDto } from './users/user.entity';
import { UserInfo } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService
    ) {}

  // End point to authenticate a user
  @Post('auth/login')
  login(@Body() logins: LoginDetails): any {
    return this.authService.validateUser(logins);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  @Get('auth/confirm')
  confirmAuth(): any {
    return {
      message: 'OK'
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  @Get('sponsorships')
  getSponsorships(): Promise<SponsorshipDto[]> {
    return this.appService.getSponsorships();
  }

  @Post('sponsorships')
  createSponsorship(@Body() sponsorship: {userInfo: UserInfo, form: any}): Promise<SponsorshipDto[]> {
    return this.appService.createSponsorship(sponsorship);
  }
}
