import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { LoginComponent } from './login.component';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
//import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';


@NgModule({
    imports: [
        ThemeModule,
        RouterModule,
    ],
    declarations: [
        LoginComponent,
    ],
    providers: [
        AuthService,
        // {
        //     // provide: HTTP_INTERCEPTORS,
        //     // useClass: TokenInterceptor,
        //     // multi: true
        // },
    ],
})
export class LoginModule {
    constructor(formBuilder: FormBuilder, router: Router, authService: AuthService) {

    }
}