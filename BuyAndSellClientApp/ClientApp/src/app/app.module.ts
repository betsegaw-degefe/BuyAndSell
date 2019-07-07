import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
//import { TokenInterceptor } from './interceptors/token.interceptor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from './auth/auth.module'
import { RegisterModule } from './auth/register/register.module';
import { LoginModule } from './auth/login/login.module';
import { AddressService } from '../app/service/address/address.service'
import { Configuration } from './app.constants';
import { NbTreeGridModule, NbMenuModule, NbDialogModule, NbLayoutModule, NbSidebarModule, NbSidebarService, NbToastrModule } from '@nebular/theme';
import { Http } from '@angular/http';
import { TreeModule, TreeComponent } from 'angular-tree-component';
import { ProductCategoryService } from './service/product-category.service';
import { RouterModule } from '@angular/router';
import { NgxUploaderModule } from 'ngx-uploader';
import { FormsModule } from '@angular/forms';
import { UploadComponent } from './pages/post-product/upload/upload.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from 'src/guards/auth-guard.service';
import { ProfileModule } from './auth/profile/profile.module';
import { NgxLoadingModule } from 'ngx-loading';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    RegisterModule,
    FormsModule,
    LoginModule,
    ProfileModule,
    NbTreeGridModule,
    TreeModule.forRoot(),
    NbLayoutModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    NbMenuModule.forRoot(),
    CoreModule.forRoot(),
    NbToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        //whitelistedDomains: ['https://localhost:5001/'],
      }
    }),
    NgxUploaderModule,
    NgxLoadingModule.forRoot({})

  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/',
    },
    AddressService,
    ProductCategoryService,
    Configuration,
    Http,
    JwtHelperService,
    AuthGuard
  ],
  exports: [],
})
export class AppModule {
}
