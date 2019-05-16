import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { NbAuthModule, NbLoginComponent } from '@nebular/auth';
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule } from '@nebular/theme';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    AuthRoutingModule,
    NbAuthModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
  ],
  bootstrap: [NbLoginComponent],
  declarations: [
    //NbLoginComponent
  ],
})
export class AuthModule {
}