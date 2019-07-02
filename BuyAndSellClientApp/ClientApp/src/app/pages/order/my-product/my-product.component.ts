import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { AuthGuard } from 'src/guards/auth-guard.service';

@Component({
  selector: 'app-my-product',
  templateUrl: './my-product.component.html',
  styleUrls: ['./my-product.component.scss']
})
export class MyProductComponent implements OnInit {

  public myProducts: any = [] // Container for products fetched from /product/myproducts end point.
  public user: any = {} //Container for holding the current user.
  public userId: any = {} // Variable to hold the current user id to send a rewuest to /product/myproducts end point.
  public starRate = 2; // Variable for storing the number of stars(rating).
  public readonly = true; // Variable to make the star(rating) readonly.

  constructor(
    private productService: ProductService,
    private authGuard: AuthGuard, ) { }

  ngOnInit() {
    this.user = this.authGuard.CURRENT_USER;
    this.userId.UserId = this.user.nameid;
    this.productService.getMyProducts(this.userId)
      .subscribe(resmyproducts => {
        if (resmyproducts) {
          resmyproducts.forEach(element => {
            element.imageUrl = encodeURI('http://localhost:5000/' + element.imageUrl);
            this.myProducts.push(element);
          });
          // resmyproducts.imageUrl = encodeURI('http://localhost:5000/' + resmyproducts.imageUrl);
          // this.myProducts.push(resmyproducts);
        }
        console.log(this.myProducts)
      })
  }

}
