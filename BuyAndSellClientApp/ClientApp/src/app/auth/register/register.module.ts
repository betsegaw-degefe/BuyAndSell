import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { RegisterComponent } from './register.component';
import { RouterModule, } from '@angular/router';
import { NbDatepickerModule } from '@nebular/theme';
import { MatButtonModule, MatIconModule, MatProgressBarModule } from '@angular/material';
import { MatFileUploadModule } from 'src/lib/matFileUpload';


@NgModule({
    imports: [
        ThemeModule,
        RouterModule,
        NbDatepickerModule,
        MatButtonModule,
        MatIconModule,
        MatProgressBarModule,
        MatFileUploadModule,
        

    ],
    declarations: [
        RegisterComponent,
    ],
})
export class RegisterModule { }