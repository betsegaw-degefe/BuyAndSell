import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { NbDialogService, NbDialogModule, NbToastrService } from '@nebular/theme';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { ProductService } from 'src/app/service/product.service';
import { CartService } from 'src/app/service/cart.service';
import { SharedDataService } from 'src/app/service/shared-data.service';

@NgModule({
  declarations: [CartComponent,],
  imports: [
    CommonModule,
    ThemeModule,
  ],
  providers:[
    NbDialogService,
    ProductService,
    CartService,
    NbToastrService,
    SharedDataService
  ],
  entryComponents: [
    
  ]
})
export class CartModule { }
