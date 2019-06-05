import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostProductComponent } from './post-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbCardModule, NbInputModule, NbButtonModule } from '@nebular/theme';

@NgModule({
  declarations: [PostProductComponent,],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NgbModule,
  ]
})
export class PostProductModule { }
