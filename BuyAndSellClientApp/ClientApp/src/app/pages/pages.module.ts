import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { ProductDetailModule } from './product-detail/product-detail.module';


@NgModule({
  declarations: [PagesComponent,],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    HomeModule,
    ProductDetailModule

  ]
})
export class PagesModule { }
