import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { SharedOrderDataService } from 'src/app/service/shared-order-data.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  public user: any = {} // Container for UserId to send a request to /order/myorder endpoint
  public order: any = {} // Container for orders fetched from /order/myorder end point
  public products: any = [] // Container for product fetched from /product/{id} end point filtering by order.productId
  public starRate = 2; // Variable for storing the number of stars(rating).
  public readonly = true; // Variable to make the star(rating) readonly.


  constructor(private orderService: OrderService,
    private productService: ProductService,
    private sharedData: SharedOrderDataService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.user.UserId = 0;
    this.orderService.getMyOrder(this.user)
      .subscribe(res => {
        if (res) {
          this.order = res;
          this.order.forEach(product => {
            this.productService.getById(product.productId)
              .subscribe(res => {
                if (res) {
                  res.imageUrl = encodeURI('http://localhost:5000/' + res.imageUrl);
                  this.products.push(res);
                }
              })
          });
        }
      })
  }

  redirectToOrderDetail(orderproduct: any) {
    console.log(orderproduct);
    this.sharedData.changeMessage(orderproduct)
    this.router.navigate(['/pages/orderdetail'])
  }
}
