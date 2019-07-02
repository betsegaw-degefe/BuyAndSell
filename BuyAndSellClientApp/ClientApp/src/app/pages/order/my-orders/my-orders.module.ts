import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrdersComponent } from './my-orders.component';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { NbCardModule, NbDialogService, NbToastrService } from '@nebular/theme';
import { NgbModule, NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedOrderDataService } from 'src/app/service/shared-order-data.service';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { MyOffersModalComponent } from '../my-offers/my-offers-modal/my-offers-modal.component';
import { PaymentService } from 'src/app/service/payment.service';
import { PaymentOrderModalComponent } from './payment-order-modal/payment-order-modal.component';
import { CartService } from 'src/app/service/cart.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@NgModule({
  declarations: [MyOrdersComponent, PaymentOrderModalComponent],
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
    NbDialogService,
    NbToastrService,
    PaymentService,
    CartService,
    JwtHelperService
  ],
  exports: [
    MyOrdersComponent
  ],
  bootstrap: [
    MyOrdersComponent
  ],
  entryComponents: [
    MyOffersModalComponent,
    PaymentOrderModalComponent
  ]
})
export class MyOrdersModule { }
