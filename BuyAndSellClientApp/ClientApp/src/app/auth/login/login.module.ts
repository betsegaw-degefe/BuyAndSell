import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { LoginComponent } from './login.component';


@NgModule({
    imports: [
        ThemeModule,
    ],
    declarations: [
        LoginComponent,
    ],
})
export class LoginModule { }