import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { ProductDetailComponent } from './product-detail.component';
import { NbButtonModule } from '@nebular/theme';

@NgModule({
  declarations: [ProductDetailComponent],
  imports: [
    CommonModule,
    ThemeModule,
    NbButtonModule,
  ]
})
export class ProductDetailModule { }
