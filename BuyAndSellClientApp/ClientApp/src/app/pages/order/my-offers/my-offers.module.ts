import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOffersComponent } from './my-offers.component';
import { OfferService } from 'src/app/service/offer.service';
import { ProductService } from 'src/app/service/product.service';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { NbCardModule } from '@nebular/theme';
import { NgbModule, NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MyOffersComponent],
  imports: [
    ThemeModule,
    CommonModule,
    NbCardModule,
    NgbModule,
    NgbButtonsModule
  ],
  providers: [
    OfferService,
    ProductService,
  ]
})
export class MyOffersModule { }
