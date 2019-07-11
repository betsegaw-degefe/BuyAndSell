import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { RegisterComponent } from './register.component';
import { RouterModule, } from '@angular/router';
import { NbDatepickerModule, NbToastrService } from '@nebular/theme';
import { MatButtonModule, MatIconModule, MatProgressBarModule } from '@angular/material';
import { MatFileUploadModule } from 'src/lib/matFileUpload';
import { UserRoleService } from 'src/app/service/user-role.service';


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
    providers: [
        UserRoleService,
        NbToastrService,
    ]
})
export class RegisterModule { }