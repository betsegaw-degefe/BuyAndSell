import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { MyOffersModule } from './my-offers/my-offers.module';
import { MyOrdersModule } from './my-orders/my-orders.module';

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    ThemeModule,
    OrderRoutingModule,
    MyOrdersModule,
    MyOffersModule
  ]
})
export class OrderModule { }
