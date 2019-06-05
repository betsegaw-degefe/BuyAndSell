import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NbCardModule } from '@nebular/theme';
import { ThemeModule } from 'src/app/@theme/theme.module';

@NgModule({
  declarations: [HomeComponent,],
  imports: [
    ThemeModule,
    CommonModule,
    NbCardModule,
  ]
})
export class HomeModule { }
