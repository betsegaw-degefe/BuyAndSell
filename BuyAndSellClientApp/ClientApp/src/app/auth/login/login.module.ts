import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [
        ThemeModule,
        RouterModule,
    ],
    declarations: [
        LoginComponent,
    ],
})
export class LoginModule { }