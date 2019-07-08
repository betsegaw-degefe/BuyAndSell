import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProductOrderComponent } from './my-product-order.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { NbCardModule } from '@nebular/theme';
import { NgbModule, NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';
import { MyOffersModalComponent } from '../my-offers/my-offers-modal/my-offers-modal.component';

@NgModule({
  declarations: [MyProductOrderComponent],
  imports: [
    CommonModule,
    ThemeModule,
    NbCardModule,
    NgbModule,
    NgbButtonsModule,
    NgxLoadingModule
  ],
  entryComponents: [
    MyOffersModalComponent,
  ]
})
export class MyProductOrderModule { }
