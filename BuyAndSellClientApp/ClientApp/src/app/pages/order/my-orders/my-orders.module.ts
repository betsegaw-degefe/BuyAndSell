import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrdersComponent } from './my-orders.component';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { NbCardModule } from '@nebular/theme';
import { NgbModule, NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MyOrdersComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NgbModule,
    NgbButtonsModule
  ],
  providers:[
    OrderService,
    ProductService,
  ]
})
export class MyOrdersModule { }
