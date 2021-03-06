import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { SharedOrderDataService } from 'src/app/service/shared-order-data.service';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { NbDialogService, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { MyOffersModalComponent } from '../my-offers/my-offers-modal/my-offers-modal.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { PaymentService } from 'src/app/service/payment.service';
import { PaymentOrderModalComponent } from './payment-order-modal/payment-order-modal.component';
import { CartService } from 'src/app/service/cart.service';
import { AuthService } from 'src/app/service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  public current_user: any = {} // Container for holding the current user.
  public user: any = {} // Container for UserId to send a request to /order/myorder endpoint.
  public orders: any = [] // Container for orders fetched from /order/myorder end point.
  public products: any = [] // Container for product fetched from /product/{id} end point filtering by order.productId.
  public paymentModel: any = {} // Container for payment from payment order modal form to send an update request to /paymentservice/payment.
  public cartsModel: any = [] //Container for list of carts fetched from /cart/mycarts.
  public starRate = 2; // Variable for storing the number of stars(rating).
  public readonly = true; // Variable to make the star(rating) readonly.
  public role: any; // Container for holding role of the current user.
  public pinCode: any = {}
  public updatePaymentService: any = {}

  // Variables related with success toast.
  destroyByClick = true;
  duration = 4000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbToastStatus = NbToastStatus.SUCCESS;
  title = 'Success!';


  constructor(private orderService: OrderService,
    private productService: ProductService,
    private sharedData: SharedDataService,
    private router: Router,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private paymentService: PaymentService,
    private cartService: CartService,
    private authService: AuthService,
    private jwtHelper: JwtHelperService,
  ) {
    var token = localStorage.getItem("token");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.current_user = this.jwtHelper.decodeToken(token);
      this.role = this.current_user.role;
    }
  }

  ngOnInit() {
    this.user.UserId = this.current_user.nameid;
    this.orderService.getMyOrder(this.user)
      .subscribe(res => {
        if (res) {
          console.log(res);
          this.orders = res;
          this.orders.forEach(product => {
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

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  redirectToOrderDetail(orderproduct: any) {
    console.log(orderproduct);
    this.sharedData.changeMessage(orderproduct)
    this.router.navigate(['/pages/productdetail'])
  }

  /**
   * 
   * @param model : {product}
   */
  cancelOrder(model: any) {
    this.productService.getById(model.productId)
      .subscribe(product_res => {
        product_res.statusId = 1
        this.productService.updateProduct(product_res)
          .subscribe(updated_res => {
            console.log(updated_res);
          })
      })
    model.active = false;
    console.log(model)
    this.dialogService.open(MyOffersModalComponent)
      .onClose.subscribe(res => {
        if (res) {
          this.orderService.deleteOrder(model)
            .subscribe(res => {
              if (res) {
                //console.log(res);
                this.showToast(this.status, this.title, `Your order canceled successfully!`);
                this.router.navigateByUrl('/pages/order', { skipLocationChange: true }).then(() =>
                  this.router.navigate(["/pages/order/myorders"]));
              }
            })
        }
      })
  }

  /**
   * process payment for the ordered product.
   * @param orderProduct : product model found on the my order page.
   */
  buyNow(orderProduct: any) {
    console.log(orderProduct)
    this.sharedData.changeMessage(orderProduct)
    this.dialogService.open(PaymentOrderModalComponent)
      .onClose.subscribe(res => {
        if (res) {
          // delete the product from my cart if any.
          this.cartService.getMyCart(this.user)
            .subscribe(carts => {
              this.cartsModel = carts;
              console.log(carts)
              if (carts) {
                carts.forEach(cart => {

                  if (cart.productId === orderProduct.id) {
                    cart.active = false;
                    this.cartService.deleteCart(cart).subscribe(res => {
                      if (res) {
                        console.log(res);
                      }
                    });
                  }
                });
              }
            });
          //delete the product from my order.
          this.orders.forEach(order => {
            if (order.productId === orderProduct.id) {
              //this.cancelOrder(order);
              order.active = false
              this.orderService.deleteOrder(order)
                .subscribe(res => {
                  if (res) {
                    console.log(res);
                    // this.showToast(this.status, this.title, `Your order canceled successfully!`);
                    // this.router.navigateByUrl('/pages/order', { skipLocationChange: true }).then(() =>
                    //   this.router.navigate(["/pages/order/myorders"]));
                  }
                })
            }
          });
          if (orderProduct.quantity == 1) {
            //delete from home page
            orderProduct.active = false
            this.productService.updateProduct(orderProduct)
              .subscribe(res => {
                if (res) {
                  this.showToast(this.status, this.title, `Your Payment is transfered successfully!`);
                  this.router.navigateByUrl('/pages/order', { skipLocationChange: true }).then(() =>
                    this.router.navigate(["/pages/order/myorders"]));
                }
              })
          } else if (orderProduct.quantity > 1) {
            this.orderService.getByProductId(orderProduct.id)
              .subscribe((order_res) => {
                this.productService.getById(orderProduct.id)
                  .subscribe((product_res: any) => {
                    product_res.quantity = product_res.quantity - order_res[0].orderedQuantity;
                    this.productService.updateProduct(product_res)
                      .subscribe(res => {
                        this.showToast(this.status, this.title, `Your Payment is transfered successfully!`);
                        this.router.navigateByUrl('/pages/order', { skipLocationChange: true }).then(() =>
                          this.router.navigate(["/pages/order/myorders"]));
                      })
                  })
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
