import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AppRouting } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbButtonModule, NbCardModule, NbThemeModule, NbLayoutModule } from '@nebular/theme';

import { HttpClientModule } from '@angular/common/http';
import { NbAuthModule, NbDummyAuthStrategy } from '@nebular/auth';

const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
  },
};

@NgModule({

  imports: [
    CommonModule,
    HttpClientModule,
    NbThemeModule,
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    BrowserModule,
    AppRouting,
    BrowserAnimationsModule,
    RouterModule,

    //NbLayoutModule.forRoot({}),
    NbAuthModule.forRoot({
      strategies: [
        NbDummyAuthStrategy.setup({
          name: 'email',

          alwaysFail: true,
          delay: 1000,
        }),
      ],
      forms: {
        login: formSetting,
        register: formSetting,
        requestPassword: formSetting,
        resetPassword: formSetting,
        logout: {
          redirectDelay: 0,
        },
      },
    }),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
