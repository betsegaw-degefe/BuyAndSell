import { Component, OnInit, EventEmitter, Output, ViewChild, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ProductCategoryService } from 'src/app/service/product-category.service';
import { PostProductService } from 'src/app/service/post-product.service';
import { ProductService } from 'src/app/service/product.service';
import { ProductAttributeValueService } from 'src/app/service/product-attribute-value.service';
import { ProductModel } from 'src/app/models/product-model';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Configuration } from 'src/app/app.constants';
import { RequestOptions } from '@angular/http';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements OnInit {

  private actionUrl: string;
  public model: any;
  public productModel: any = {};
  public propertyValue: any = {};
  public categories = [];
  public categoriesName = [];
  public categoriesParentId = [];
  private categoryNameCounter: number = 0;
  public searchCategory: String = "";
  public searchCategoryModel: any = {};
  public productProperties: any = [];
  public props: any = [];
  public imageUrl: any;

  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();


  constructor(private data: ProductCategoryService,
    private http: HttpClient,
    private postProductdata: PostProductService,
    private productdata: ProductService,
    private productAttributeValuedata: ProductAttributeValueService,
    private fileService: FileUploadService,
    private router: Router,
    private configuration: Configuration
  ) {
    this.actionUrl = configuration.serverWithApiUrl + 'upload/';
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  ngOnInit() {
    this.data.get()
      .subscribe(success => {
        if (success) {
          this.categories = this.data.productCategory
          console.log(this.categories);
          for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i].level === 3) {
              this.categoriesName[this.categoryNameCounter]
                = this.categories[i].parent.parent.name + " | "
                + this.categories[i].parent.name + " | "
                + this.categories[i].name;
              this.categoriesParentId[this.categoryNameCounter] = this.categories[i].parentId;
              this.categoryNameCounter++;
            }
          }
          for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i].level === 2) {
              for (let j = 0; j < this.categoriesParentId.length; j++) {
                if (this.categories[i].id === this.categoriesParentId[j]) {
                  break;
                } else if (j + 1 === this.categoriesParentId.length) {
                  this.categoriesName[this.categoryNameCounter]
                    = this.categories[i].parent.name + " | "
                    + this.categories[i].name;
                  this.categoryNameCounter++;
                }
              }
            }
          }
          console.log(this.categoriesName);
        }
      })
  }

  searchProductProperty(data: any) {
    console.log(data);
    for (let i = data.length - 1; i > 0; i--) {
      if (data[i] === "|") {
        this.searchCategory = data.substr(i + 2);
        break;
      }
    }
    this.searchCategoryModel.name = this.searchCategory;
    console.log(this.searchCategory);
    this.data.getCategory(this.searchCategoryModel)
      .subscribe(res => {
        if (res) {
          this.postProductdata.getProductAttribute(res[0].id)
            .subscribe(res => {
              if (res) {
                //this.props =Object.assign(res);
                this.productProperties = res;
                console.log(this.productProperties)
              }
            })
        }
      });
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.categoriesName.filter(v => v.toLowerCase()
          .indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  // Upload image to the server
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', <File>files[0]);

    this.http.post(this.actionUrl, formData, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'encodedData'
      }, reportProgress: true, observe: 'events'
    })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'successfully Uploaded!.';
          this.onUploadFinished.emit(event.body);
          this.imageUrl = event.body;
          console.log(this.imageUrl.dbPath)
        }
      });
  }

  // Save product to product attribute value and product table.
  saveProduct() {
    var propertyValueModel: any = {}
    this.productModel.StatusId = 1;
    if (this.imageUrl != null)
      this.productModel.imageUrl = this.imageUrl.dbPath;
    this.productdata.register(this.productModel)
      .subscribe(res => {
        if (res) {
          this.productModel = {}
          this.productModel = res;
          console.log(this.productModel)
          for (var propertyKey in this.propertyValue) {
            //console.log(propertyKey + " -> " + this.propertyValue[propertyKey]);
            for (let index = 0; index < this.productProperties.length; index++) {
              if (this.productProperties[index].name === propertyKey) {
                propertyValueModel.ProductAttributeId = this.productProperties[index].id
                propertyValueModel.Value = this.propertyValue[propertyKey]
                propertyValueModel.ProductId = this.productModel.id
              }
            }
          }
          console.log(propertyValueModel);
          this.productAttributeValuedata.register(propertyValueModel)
            .subscribe(res => {
              if (res) {
                console.log(res);
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                  this.router.navigate(["/pages/postproduct"]));
              }
            });
          //this.productAttributeValueModel.ProductId = this.productModel.id
          //this.productAttributeValueModel.ProductAttributeId = this.productProperties.id
        }
      });
  }
}
