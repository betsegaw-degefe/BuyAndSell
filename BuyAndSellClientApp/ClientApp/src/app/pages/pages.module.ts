import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HomeModule } from './home/home.module';
import { ProductDetailModule } from './product-detail/product-detail.module';
import { PostProductComponent } from './post-product/post-product.component';
import { CartComponent } from './cart/cart.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [PagesComponent, PostProductComponent, CartComponent,],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    HomeModule,
    ProductDetailModule,
    AngularFontAwesomeModule,
    NgbModule

  ]
})
export class PagesModule { }
