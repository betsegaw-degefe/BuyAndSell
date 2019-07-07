import { Component, OnInit, EventEmitter, Output, ViewChild, Input, HostBinding } from '@angular/core';
import { Observable, of, interval } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ProductCategoryService } from 'src/app/service/product-category.service';
import { PostProductService } from 'src/app/service/post-product.service';
import { ProductService } from 'src/app/service/product.service';
import { ProductAttributeValueService } from 'src/app/service/product-attribute-value.service';
import { ProductModel } from 'src/app/models/product-model';
import { NbToastrService, NbDialogService, NbDialogRef, NbGlobalPosition, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Configuration } from 'src/app/app.constants';
import { RequestOptions } from '@angular/http';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { PostProductModalComponent } from './post-product-modal/post-product-modal.component';
import { ProductAttributeService } from 'src/app/service/product-attribute.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from 'src/guards/auth-guard.service';


@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements OnInit {
  public current_user: any = {} // Container for holding the current user.
  public actionUrl: string;
  public model: any;
  public productModel: any = {};
  public propertyValue: any = {}; //Container for value of Product property form fields.
  public categories = [];
  public categoriesName = [];
  public categoriesParentId = [];
  public categoryNameCounter: number = 0;
  public searchCategory: String = "";
  public searchMainCategory = "" // Container for Main category name to search the main category id.
  public searchCategoryModel: any = {};
  public productProperties: any = []; // Container for product Attribute received from the db(productAttribute table).
  public props: any = [];
  public imageUrl: any;
  public productAttribute: any = {}; // Container for product attribute cached from the post product modal.
  public categoryModel: any = {}; // Container for Category after searching the category by name from db.
  public unApprovedProperties: any = [] // Container for unapproved product property fetched from /productattribute/

  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  public user: any = {} //Container for holding the current user
  public role: any = {}; // Container for holding role of the current user.


  // Variables related with success toast.
  destroyByClick = true;
  duration = 4000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbToastStatus = NbToastStatus.SUCCESS;
  title = 'Success!';
  content = `The product property added successfully!`;

  negotiable = true; // radio button value for negotiable.
  constructor(private data: ProductCategoryService,
    private http: HttpClient,
    private postProductdata: PostProductService,
    private productdata: ProductService,
    private productAttributeValuedata: ProductAttributeValueService,
    private router: Router,
    private configuration: Configuration,
    private dialogService: NbDialogService,
    private attributeService: ProductAttributeService,
    private toastrService: NbToastrService,
    private authGuard: AuthGuard,
    private jwtHelper: JwtHelperService,
  ) {
    this.actionUrl = configuration.serverWithApiUrl + 'upload/';
    var token = localStorage.getItem("token");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.current_user = this.jwtHelper.decodeToken(token);
      this.role = this.current_user.role;
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  ngOnInit() {
    //this.user = this.authGuard.CURRENT_USER;
    console.log(this.role);
    this.data.get()
      .subscribe(success => {
        if (success) {
          this.categories = this.data.productCategory
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
        }
      })
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.categoriesName.filter(v => v.toLowerCase()
          .indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  // When ngbtypeahead selected item clicked, this function triggered.
  selectedItem(item) {
    if (item.item != null)
      var data = item.item;
    else
      var data = item

    // Extract the key word for searching.
    for (let i = data.length - 1; i > 0; i--) {
      if (data[i] === "|") {
        this.searchCategory = data.substr(i + 2);
        break;
      }
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i] === "|") {
        this.searchMainCategory = data.substr(0, i - 1);
        break;
      }
    }
    this.searchCategoryModel.name = this.searchCategory;

    // Search the key word from the database.
    this.data.getCategory(this.searchCategoryModel)
      .subscribe(category_res => {
        if (category_res) {
          this.categoryModel = category_res;
          this.postProductdata.getProductAttribute(category_res[0].id)
            .subscribe(attribute_res => {
              if (attribute_res) {
                console.log(attribute_res)
                this.productProperties = attribute_res;
              }
            })
          this.postProductdata.getUnApprovedProductAttribute(category_res[0].id)
            .subscribe(unApproved_res => {
              if (unApproved_res) {
                this.unApprovedProperties = unApproved_res;
              }
            })
        }
      });

    this.searchCategoryModel.name = this.searchMainCategory;
    // Search the Main category from the database.
    this.data.getCategory(this.searchCategoryModel)
      .subscribe(res => {
        if (res) {
          this.productModel.MainCategoryId = res[0].id
          // this.categoryModel = res;
          // this.postProductdata.getProductAttribute(res[0].id)
          //   .subscribe(res => {
          //     if (res) {
          //       this.productProperties = res;
          //     }
          //   })
        }
      });
  }

  /**
   * Approve button trigger this function.
   */
  approvePrroductAttribute(unApprovedProperty: any) {
    console.log(unApprovedProperty)
    unApprovedProperty.approved = true
    this.attributeService.updateProductAttribute(unApprovedProperty)
      .subscribe((attribute_res: any) => {
        this.showToast(this.status, this.title, `Product property approved successfully!`);
        this.selectedItem("")
        this.selectedItem(this.model)
      })
  }

  /**
   * cancel product attribiute button trigger this function.
   * @param unApprovedProperty 
   */
  cancelPrroductAttribute(unApprovedProperty: any) {
    unApprovedProperty.active = false;
    this.attributeService.updateProductAttribute(unApprovedProperty)
      .subscribe((attribute_res: any) => {
        this.showToast(this.status, this.title, `Product property canceled successfully!`);
        this.selectedItem("")
        this.selectedItem(this.model)
      })
  }

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
    var propertyValueModel: any = []; // Container for product attrbute value to send to db.
    this.productModel.StatusId = 1;
    this.productModel.Negotiable = this.negotiable
    this.productModel.CreatedBy = +this.current_user.nameid
    if (this.imageUrl != null)
      this.productModel.imageUrl = this.imageUrl.dbPath;
    console.log(this.productModel)
    this.productdata.register(this.productModel)
      .subscribe(res => {
        if (res) {
          this.productModel = {}
          this.productModel = res;
          for (var propertyKey in this.propertyValue) {
            //console.log(propertyKey + " -> " + this.propertyValue[propertyKey]);
            for (let index = 0; index < this.productProperties.length; index++) {
              if (this.productProperties[index].name === propertyKey) {
                var tempPropertyValue = {
                  ProductAttributeId: this.productProperties[index].id,
                  Value: this.propertyValue[propertyKey],
                  ProductId: this.productModel.id,
                  Active: true
                }
                propertyValueModel.push(tempPropertyValue)
              }
            }
          }
          console.log(propertyValueModel);
          this.productAttributeValuedata.register(propertyValueModel)
            .subscribe(res => {
              if (res != null && res != []) {
                this.showToast(this.status, this.title, `Product saved successfully!`);
                //this.selectedItem("");
                this.router.navigateByUrl('/pages', { skipLocationChange: true }).then(() =>
                  this.router.navigate(["/pages/home"]));
              }
            });
        }
      });
  }

  // Add product property/attribute
  addProperty() {
    this.dialogService.open(PostProductModalComponent)
      .onClose.subscribe(attribute => {
        if (attribute != null && attribute[0] != "") {
          if (this.role === 'Admin') {
            this.productAttribute.CategoryId = this.categoryModel[0].id;
            this.productAttribute.Name = attribute[0];
            this.productAttribute.DataType = attribute[1];
            this.productAttribute.CreatedBy = +this.current_user.nameid;
            this.productAttribute.LastUpdatedBy = +this.current_user.nameid;
            this.productAttribute.Approved = true;
            this.attributeService.register(this.productAttribute)
              .subscribe(success => {
                if (success != null && success != []) {
                  this.showToast(this.status, this.title, this.content);
                  this.selectedItem("")
                  this.selectedItem(this.model)
                }
              })
          } else if (this.role === 'User') {
            this.productAttribute.CategoryId = this.categoryModel[0].id;
            this.productAttribute.Name = attribute[0];
            this.productAttribute.DataType = attribute[1];
            this.productAttribute.CreatedBy = +this.current_user.nameid;
            this.productAttribute.LastUpdatedBy = +this.current_user.nameid;
            this.productAttribute.Approved = false;
            this.attributeService.register(this.productAttribute)
              .subscribe(success => {
                if (success != null && success != []) {
                  this.showToast(this.status, this.title, `Product property suggested successfully!`);
                  this.selectedItem("")
                  this.selectedItem(this.model)
                }
              })
          }
        }
      });
  }

  /**
   * A toast for success message
   * @param type : type of toast. eg. success, warning...
   * @param title : title of the toast. 
   * @param body : message for the toast.
   */
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `${title}` : '';

    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
}