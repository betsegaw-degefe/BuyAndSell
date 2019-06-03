import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { AddressModule } from './address/address.module';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [CategoryComponent, ProductComponent, ],
  imports: [
    CommonModule,
    ThemeModule,
    CategoryRoutingModule,
    AddressModule
  ]
})
export class CategoryModule { }
