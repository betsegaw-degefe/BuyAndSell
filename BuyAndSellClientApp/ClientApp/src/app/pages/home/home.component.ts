import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { ProductCategoryService } from 'src/app/service/product-category.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products: any = []
  public imageUrl: any;
  public starRate = 2;
  public readonly = true;
  public mainCategories: any = []; // Container for Main Categories list fetched from /category/maincategory end point.
  public searchProduct: any = {} // Container for searchProduct by key to send a search request to /product/searchproductbykey.

  constructor(private productService: ProductService,
    private router: Router,
    private sharedData: SharedDataService,
    private categoryService: ProductCategoryService
  ) {

  }

  ngOnInit() {
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
        }
      })
  }

  /**
   * get all product
   */
  getAllProduct() {
    this.productService.get()
      .subscribe(success => {
        if (success) {
          console.log(this.productService.product);
          this.products = this.productService.product; //
          this.products.forEach(element => {
            element.imageUrl = encodeURI('http://localhost:5000/' + element.imageUrl);
          });
        }
      });
  }


  redirect(product: any) {
    //console.log(product);
    //this.sharedData.changeMessage.subscribe(message => this.message = message)
    // this.sharedData.currentMessage.subscribe(message => productId = message)
    this.sharedData.changeMessage(product)

    this.router.navigate(['/pages/productdetail'])
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
          });
          this.searchProduct = {}
        }
      })

  }
}