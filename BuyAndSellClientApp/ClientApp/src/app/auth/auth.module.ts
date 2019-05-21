import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { AuthComponent } from './auth.component'
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule, NbDatepickerModule } from '@nebular/theme';
import { NbAuthModule, NbLoginComponent, NbPasswordAuthStrategy } from '@nebular/auth';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginModule } from './login/login.module';
//import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';
import { MatButtonModule, MatIconModule, MatProgressBarModule } from '@angular/material';
import { MatFileUploadModule } from 'src/lib/matFileUpload';

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
    RegisterModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatFileUploadModule,

    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
        }),
      ],

    }),
    //NbAuthModule.forRoot(),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    NbDatepickerModule.forRoot(),
  ],
  bootstrap: [AuthComponent],
  declarations: [
    AuthComponent,
  ],
})


export class AuthModule {
}