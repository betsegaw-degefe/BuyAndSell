import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { AuthComponent } from './auth.component'
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule } from '@nebular/theme';
import { NbAuthModule, NbLoginComponent,NbPasswordAuthStrategy } from '@nebular/auth';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';


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
    LoginModule,
    
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
        }),
      ],
      forms: {},
    }),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
  ],
  bootstrap: [NbLoginComponent],
  declarations: [
    AuthComponent,
  ],
})
export class AuthModule {
}