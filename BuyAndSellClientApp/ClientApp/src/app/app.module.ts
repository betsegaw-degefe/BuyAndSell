import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { TokenInterceptor } from './interceptors/token.interceptor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from './auth/auth.module'
import { RegisterModule } from './auth/register/register.module';
import { LoginModule } from './auth/login/login.module';
import { AddressService } from '../app/service/address/address.service'
import { Configuration } from './app.constants';
import { NbTreeGridModule, NbMenuModule } from '@nebular/theme';
import { Http } from '@angular/http';
import { TreeModule, TreeComponent } from 'angular-tree-component';
import { ProductCategoryService } from './service/product-category.service';


@NgModule({
  declarations: [AppComponent,],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    RegisterModule,
    LoginModule,
    NbTreeGridModule,
    TreeModule.forRoot(),
    

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    NbMenuModule.forRoot(),

    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/',
    } ,
    AddressService,
    ProductCategoryService,
    Configuration,
    Http
  ],
})
export class AppModule {
}
