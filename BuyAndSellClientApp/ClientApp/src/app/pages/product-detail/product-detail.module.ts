import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { ProductDetailComponent } from './product-detail.component';
import { NbButtonModule, NbDialogModule } from '@nebular/theme';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { ProductAttributeValueService } from 'src/app/service/product-attribute-value.service';
import { PostProductService } from 'src/app/service/post-product.service';
import { ProductDetailModalComponent } from './product-detail-modal/product-detail-modal.component';
import { OrderService } from 'src/app/service/order.service';
import { OfferService } from 'src/app/service/offer.service';

@NgModule({
  declarations: [ProductDetailComponent, ProductDetailModalComponent],
  imports: [
    CommonModule,
    ThemeModule,
    NbButtonModule,
    NbDialogModule.forChild(),
  ],
  providers: [SharedDataService,
    ProductAttributeValueService,
    PostProductService,
    OrderService,
    OfferService],
    
  entryComponents: [
    ProductDetailModalComponent
  ]
})
export class ProductDetailModule { }
