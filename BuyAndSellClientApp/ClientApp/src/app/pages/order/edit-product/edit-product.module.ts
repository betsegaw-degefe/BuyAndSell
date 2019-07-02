import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProductComponent } from './edit-product.component';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { NbCardModule } from '@nebular/theme';
import { NgbModule, NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductAttributeValueService } from 'src/app/service/product-attribute-value.service';
import { ProductAttributeService } from 'src/app/service/product-attribute.service';

@NgModule({
  declarations: [EditProductComponent],
  imports: [
    CommonModule,
    ThemeModule,
    NbCardModule,
    NgbModule,
    NgbButtonsModule,
  ],
  providers:[
    SharedDataService,
    ProductAttributeValueService,
    ProductAttributeService
    
  ]
})
export class EditProductModule { }
