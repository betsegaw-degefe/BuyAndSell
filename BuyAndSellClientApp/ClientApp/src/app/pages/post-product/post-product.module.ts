import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostProductComponent } from './post-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbCardModule, NbInputModule, NbButtonModule, NbDialogService, NbActionsModule, NbDialogModule, NbSelectModule, NbTooltipModule } from '@nebular/theme';
import { ProductCategoryService } from 'src/app/service/product-category.service';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { NgxUploaderModule } from 'ngx-uploader';
import { UploadComponent } from './upload/upload.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductAttributeService } from 'src/app/service/product-attribute.service';
import { JwtHelperService } from '@auth0/angular-jwt';

const modules = [
  CommonModule,
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NgbModule,
  NgxUploaderModule,
  FormsModule,
  HttpClientModule,
  NbButtonModule,
  NbInputModule,
  NbActionsModule,
  NbSelectModule,
  NbTooltipModule,
  
]

@NgModule({
  entryComponents: [
  ],
  declarations: [
    PostProductComponent,
    UploadComponent,
  ],
  imports: [...modules,],
  providers: [
    ProductCategoryService,
    NbDialogService,
    FileUploadService,
    ProductAttributeService,
    JwtHelperService
  ],
})
export class PostProductModule { }
