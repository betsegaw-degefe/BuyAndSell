import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NbCardModule } from '@nebular/theme';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { ProductService } from 'src/app/service/product.service';
import { NgbButtonsModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { ProductCategoryService } from 'src/app/service/product-category.service';

@NgModule({
  declarations: [HomeComponent,],
  imports: [
    ThemeModule,
    CommonModule,
    NbCardModule,
    NgbModule,
    NgbButtonsModule
  ],
  providers: [
    ProductService,
    SharedDataService,
    ProductCategoryService],
  exports: [HomeComponent],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
