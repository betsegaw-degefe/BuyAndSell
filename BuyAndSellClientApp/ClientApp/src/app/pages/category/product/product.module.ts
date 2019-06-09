import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { TreeModule } from 'angular-tree-component';
import { NbCardModule, NbDialogService, NbButtonModule, NbInputModule } from '@nebular/theme';
import { MatCommonModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatRippleModule, MatIconModule } from '@angular/material';
import { ProductCategoryService } from 'src/app/service/product-category.service';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ModalComponent } from './modal/modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  CommonModule,
  TreeModule,
  NbCardModule,
  MatCommonModule,
  MatTreeModule,
  MatCheckboxModule,
  MatIconModule,
  NbCardModule,
  NbButtonModule,
  NbInputModule,
];


@NgModule({
  declarations: [ProductComponent, ModalComponent],
  imports: [...modules,],
  providers: [
    ProductCategoryService,
    NbDialogService,
  ],
  entryComponents: [
    ModalComponent,
  ],
  exports: [ModalComponent],
})
export class ProductModule { }
