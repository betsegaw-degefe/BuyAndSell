import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { AddressModule } from './address/address.module';
import { ProductModule } from './product/product.module';
import { NbCardModule } from '@nebular/theme';

@NgModule({
  declarations: [CategoryComponent, ],
  imports: [
    CommonModule,
    ThemeModule,
    CategoryRoutingModule,
    AddressModule,
    ProductModule,
  ]
})
export class CategoryModule { }
