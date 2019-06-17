import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NbCardModule } from '@nebular/theme';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { ProductService } from 'src/app/service/product.service';
import { NgbButtonsModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HomeComponent,],
  imports: [
    ThemeModule,
    CommonModule,
    NbCardModule,
    NgbModule,
    NgbButtonsModule
  ],
  providers: [ProductService],
  exports: [HomeComponent],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
