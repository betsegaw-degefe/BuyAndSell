import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [PagesComponent, ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,

  ]
})
export class PagesModule { }
