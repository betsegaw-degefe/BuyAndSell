import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { LoginComponent } from './login.component';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder } from '@angular/forms';


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
    ],
})
export class LoginModule { 
    constructor(formBuilder: FormBuilder, router: Router, authService: AuthService) {
        
    }
}