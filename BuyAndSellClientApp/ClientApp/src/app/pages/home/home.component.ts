import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbThemeService, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { ProductCategoryService } from 'src/app/service/product-category.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { AuthService } from 'src/app/service/auth.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public imageUrl: any;
  public products: any = []
  public starRate = 2;
  public readonly = true;
  public mainCategories: any = []; // Container for Main Categories list fetched from /category/maincategory end point.
  public searchProduct: any = {} // Container for searchProduct by key to send a search request to /product/searchproductbykey.
  public postedBy: any;
  public productStatus;
  public loading = false;

  // Variables related with success toast.
  destroyByClick = true;
  duration = 4000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbToastStatus = NbToastStatus.DANGER;
  title = 'Success!';

  constructor(private productService: ProductService,
    private router: Router,
    private sharedData: SharedDataService,
    private categoryService: ProductCategoryService,
    private authService: AuthService,
    private toastrService: NbToastrService,
  ) {

  }

  ngOnInit() {
    this.loading = true;
    this.getMainCategory();
    this.getAllProduct();
   
  }

  /**
   * get main categories for the category combo box.
   */
  getMainCategory() {
    this.categoryService.getMainCategory()
      .subscribe(res => {
        if (res) {
          console.log(res);
          this.mainCategories = res
          this.loading = false;
        }
      })
  }

  /**
   * get all product
   */
  getAllProduct() {
    //Date now = moment().unix();
    console.log(new Date().toLocaleTimeString());
    this.productService.get()
      .subscribe(success => {
        if (success) {
          console.log(this.productService.product);
          this.products = this.productService.product;
          this.products.forEach(element => {
            //element.createdAt = moment(element.createdAt).format('LLL')
            element.lastUpdated = moment(element.lastUpdated).fromNow();
            element.imageUrl = encodeURI('http://localhost:5000/' + element.imageUrl);
            if (element.statusId === 1) {
              element.statusId = "Available";
            } else if (element.statusId === 3) {
              element.statusId = "Ordered"
            }
            this.authService.getUserById(element.createdBy)
              .subscribe(res => {
                if (res) {
                  element.createdBy = res.firstName;
                  //element.createdAt = moment(element.createdAt, "YYYYMMDD h:mm:ss a").fromNow();
                  this.loading = false;
                }
              })
          });
        }
      });

  }


  redirect(product: any) {
    console.log(product);
    if (product.statusId === "Ordered") {
      this.showToast(this.status, this.title, `Sorry, this product is already ordered!`);
    } else {
      this.sharedData.changeMessage(product)
      this.router.navigate(['/pages/productdetail'])
    }
  }

  search() {
    if (this.searchProduct.SearchKey === undefined && this.searchProduct.MainCategoryId === undefined) {
      this.searchProduct.MainCategoryId = 0;
      this.searchProduct.SearchKey = "";
    } else if (this.searchProduct.SearchKey === undefined && this.searchProduct.MainCategoryId != undefined) {
      this.searchProduct.MainCategoryId = +this.searchProduct.MainCategoryId;// casting the string to number.
      this.searchProduct.SearchKey = "";
    } else if (this.searchProduct.SearchKey != undefined && this.searchProduct.MainCategoryId === undefined) {
      this.searchProduct.MainCategoryId = 0;
    }
    console.log(this.searchProduct);
    this.productService.SearchProductByKey(this.searchProduct)
      .subscribe(res => {
        if (res) {
          console.log(res);
          this.products = res;
          this.products.forEach(element => {
            element.imageUrl = encodeURI('http://localhost:5000/' + element.imageUrl);
            element.lastUpdated = moment(element.lastUpdated).fromNow();
            this.authService.getUserById(element.createdBy)
              .subscribe(res => {
                if (res) {
                  element.createdBy = res.firstName;
                  //element.createdAt = moment(element.createdAt, "YYYYMMDD h:mm:ss a").fromNow();
                }
              })
          });
          this.searchProduct = {}
        }
      })

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