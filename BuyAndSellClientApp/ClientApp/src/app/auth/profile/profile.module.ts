import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { AuthService } from 'src/app/service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule
  ],
  providers:[
    AuthService,
    JwtHelperService
  ]
})
export class ProfileModule { }
