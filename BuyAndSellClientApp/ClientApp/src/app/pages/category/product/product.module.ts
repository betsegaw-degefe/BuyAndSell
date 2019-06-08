import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { TreeModule } from 'angular-tree-component';
import { NbCardModule } from '@nebular/theme';
import { MatCommonModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatRippleModule, MatIconModule } from '@angular/material';
import { ProductCategoryService } from 'src/app/service/product-category.service';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
  MatIconModule
];


@NgModule({
  declarations: [ProductComponent],
  imports: [...modules],
  providers: [
    ProductCategoryService,
  ],
})
export class ProductModule { }
