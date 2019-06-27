import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailComponent } from './order-detail.component';
import { ProductAttributeValueService } from 'src/app/service/product-attribute-value.service';
import { PostProductService } from 'src/app/service/post-product.service';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { SharedOrderDataService } from 'src/app/service/shared-order-data.service';
import { NbCardModule } from '@nebular/theme';

@NgModule({
  declarations: [OrderDetailComponent],
  imports: [
    ThemeModule,
    CommonModule,
    ThemeModule,
    NbCardModule
  ],
  providers: [SharedOrderDataService,
    ProductAttributeValueService,
    PostProductService,]
})
export class OrderDetailModule { }
