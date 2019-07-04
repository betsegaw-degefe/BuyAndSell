import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProductComponent } from './my-product.component';
import { ProductService } from 'src/app/service/product.service';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { NbCardModule, NbDialogModule, NbDialogService, NbWindowModule, NbWindowService, NbTreeGridModule } from '@nebular/theme';
import { NgbModule, NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { OfferListModalComponent } from './offer-list-modal/offer-list-modal.component';
import { AuthService } from 'src/app/service/auth.service';

@NgModule({
  declarations: [MyProductComponent, DeleteModalComponent, OfferListModalComponent],
  imports: [
    ThemeModule,
    CommonModule,
    NbCardModule,
    NgbModule,
    NgbButtonsModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    NbTreeGridModule,
  ],
  providers:[
    ProductService,
    NbDialogService,
    NbWindowService,
    AuthService
  ],
  entryComponents:[
    DeleteModalComponent,
    OfferListModalComponent
  ]
})
export class MyProductModule { }
