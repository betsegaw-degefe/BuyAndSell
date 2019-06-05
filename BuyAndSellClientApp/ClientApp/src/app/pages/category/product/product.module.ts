import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { TreeModule } from 'angular-tree-component';
import { NbCardModule } from '@nebular/theme';
import { MatCommonModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [ProductComponent,],
  imports: [
    CommonModule,
    TreeModule,
    NbCardModule,
    MatCommonModule
  ]
})
export class ProductModule { }
