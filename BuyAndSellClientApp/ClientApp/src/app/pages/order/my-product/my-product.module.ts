import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProductComponent } from './my-product.component';
import { ProductService } from 'src/app/service/product.service';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { NbCardModule, NbDialogModule, NbDialogService } from '@nebular/theme';
import { NgbModule, NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';

@NgModule({
  declarations: [MyProductComponent, DeleteModalComponent],
  imports: [
    ThemeModule,
    CommonModule,
    NbCardModule,
    NgbModule,
    NgbButtonsModule,
    NbDialogModule.forChild(),
  ],
  providers:[
    ProductService,
    NbDialogService
  ],
  entryComponents:[
    DeleteModalComponent
  ]
})
export class MyProductModule { }
