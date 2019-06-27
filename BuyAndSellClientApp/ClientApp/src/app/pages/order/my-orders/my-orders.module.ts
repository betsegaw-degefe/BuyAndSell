import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrdersComponent } from './my-orders.component';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { NbCardModule } from '@nebular/theme';
import { NgbModule, NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedOrderDataService } from 'src/app/service/shared-order-data.service';
import { ThemeModule } from 'src/app/@theme/theme.module';

@NgModule({
  declarations: [MyOrdersComponent],
  imports: [
    ThemeModule,
    CommonModule,
    NbCardModule,
    NgbModule,
    NgbButtonsModule
  ],
  providers: [
    SharedOrderDataService,
    OrderService,
    ProductService,
  ],
  exports: [
    MyOrdersComponent
  ],
  bootstrap: [
    MyOrdersComponent
  ]
})
export class MyOrdersModule { }
