import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostProductComponent } from './post-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbCardModule, NbInputModule, NbButtonModule } from '@nebular/theme';
import { ProductCategoryService } from 'src/app/service/product-category.service';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { NgxUploaderModule } from 'ngx-uploader';

@NgModule({
  declarations: [PostProductComponent,],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NgbModule,
    NgxUploaderModule
  ],
  providers: [
    ProductCategoryService,
    FileUploadService
  ],
})
export class PostProductModule { }
