import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { MyOffersModule } from './my-offers/my-offers.module';
import { MyOrdersModule } from './my-orders/my-orders.module';
import { SharedOrderDataService } from 'src/app/service/shared-order-data.service';
import { MyProductModule } from './my-product/my-product.module';
import { EditProductModule } from './edit-product/edit-product.module';

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    ThemeModule,
    OrderRoutingModule,
    MyOrdersModule,
    MyOffersModule,
    MyProductModule,
    EditProductModule
  ],
 
})
export class OrderModule { }
