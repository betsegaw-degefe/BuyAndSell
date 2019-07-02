import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProductComponent } from './my-product.component';
import { ProductService } from 'src/app/service/product.service';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { NbCardModule, NbDialogModule } from '@nebular/theme';
import { NgbModule, NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MyProductComponent],
  imports: [
    ThemeModule,
    CommonModule,
    NbCardModule,
    NgbModule,
    NgbButtonsModule,
    NbDialogModule.forChild(),
  ],
  providers:[
    ProductService
  ]
})
export class MyProductModule { }
