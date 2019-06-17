import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostProductComponent } from './post-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbCardModule, NbInputModule, NbButtonModule } from '@nebular/theme';
import { ProductCategoryService } from 'src/app/service/product-category.service';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { NgxUploaderModule } from 'ngx-uploader';
import { UploadComponent } from './upload/upload.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [PostProductComponent, UploadComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NgbModule,
    NgxUploaderModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ProductCategoryService,
    FileUploadService
  ],
})
export class PostProductModule { }
