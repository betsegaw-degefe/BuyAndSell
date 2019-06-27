import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOffersComponent } from './my-offers.component';
import { OfferService } from 'src/app/service/offer.service';
import { ProductService } from 'src/app/service/product.service';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { NbCardModule, NbDialogService, NbDialogModule } from '@nebular/theme';
import { NgbModule, NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';
import { MyOffersModalComponent } from './my-offers-modal/my-offers-modal.component';
import { Router } from '@angular/router';

@NgModule({
  declarations: [MyOffersComponent, MyOffersModalComponent],
  imports: [
    ThemeModule,
    CommonModule,
    NbCardModule,
    NgbModule,
    NgbButtonsModule,
    NbDialogModule.forChild(),
  ],
  providers: [
    OfferService,
    ProductService,
    NbDialogService
  ],
  entryComponents: [
    MyOffersModalComponent
  ]
})
export class MyOffersModule { }
