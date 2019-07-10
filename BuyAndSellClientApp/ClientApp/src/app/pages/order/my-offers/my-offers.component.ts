import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/service/offer.service';
import { ProductService } from 'src/app/service/product.service';
import { NbDialogService, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { MyOffersModalComponent } from './my-offers-modal/my-offers-modal.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/guards/auth-guard.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OrderModalComponent } from './order-modal/order-modal.component';
import { OrderService } from 'src/app/service/order.service';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { PaymentOrderModalComponent } from '../my-orders/payment-order-modal/payment-order-modal.component';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss']
})
export class MyOffersComponent implements OnInit {

  public current_user: any = {} // Container for holding the current user.
  public user: any = {} // Container for UserId to send a request to /order/myorder endpoint
  public products: any = [] // Container for product fetched from /product/{id} end point filtering by order.productId
  public offers: any = [] // Container for offers fetched from /offer/myoffer end point
  public starRate = 2; // Variable for storing the number of stars(rating).
  public readonly = true; // Variable to make the star(rating) readonly.
  public orderModel: any = {} // Container for Order to send to Order table.
  public offeredProduct: any = {}

  // Variables related with success toast.
  destroyByClick = true;
  duration = 4000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbToastStatus = NbToastStatus.SUCCESS;
  title = 'Success!';

  constructor(private offerService: OfferService,
    private productService: ProductService,
    private dialogService: NbDialogService,
    private sharedData: SharedDataService,
    private orderService: OrderService,
    private toastrService: NbToastrService,
    private router: Router,
    private jwtHelper: JwtHelperService,
  ) {
    var token = localStorage.getItem("token");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.current_user = this.jwtHelper.decodeToken(token);
    }
  }

  ngOnInit() {
    this.user.UserId = this.current_user.nameid;
    this.offerService.getMyOffer(this.user)
      .subscribe(offers => {
        if (offers) {
          this.offers = offers
          console.log(this.offers);
          this.offers.forEach(product => {
            this.productService.getById(product.productId)
              .subscribe(res => {
                if (res) {
                  res.imageUrl = encodeURI('http://localhost:5000/' + res.imageUrl);
                  this.products.push(res);
                }
              });
          });
          console.log(this.products)
        }
      })
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  /**
   * open a modal
   * @param model : offer model offer.active = false
   */
  cancelOffer(model: any) {
    model.active = false;
    console.log(model);
    this.dialogService.open(MyOffersModalComponent)
      .onClose.subscribe(res => {
        if (res) {
          this.offerService.updateOffer(model)
            .subscribe(res => {
              if (res) {
                //console.log(res);
                this.showToast(this.status, this.title, `Your offer canceled successfully!`);
                this.router.navigateByUrl('/pages/order', { skipLocationChange: true }).then(() =>
                  this.router.navigate(["/pages/order/myoffers"]));
              }
            })
        }
      })
  }



  order(product: any, offer: any) {
    console.log(product);
    console.log(offer);
    this.dialogService.open(OrderModalComponent)
      .onClose.subscribe(res => {
        console.log(res);
        if (res) {

          this.productService.getById(product.id)
            .subscribe(product_res => {
              if (product.quantity === 1) {
                product_res.statusId = 3
              }
              this.productService.updateProduct(product_res)
                .subscribe(updated_res => {
                  console.log(updated_res);
                  this.orderModel.ProductId = product.id;
                  this.orderModel.SellerId = product.createdBy;
                  this.orderModel.BuyerId = +this.current_user.nameid;
                  this.orderModel.CreatedBy = +this.current_user.nameid;
                  this.orderModel.Active = true;
                  this.orderModel.OrderedQuantity = offer.orderedQuantity;
                  this.orderModel.Contact = updated_res.contact;
                  console.log(this.orderModel)

                  // resgister an order from the offered product
                  this.orderService.register(this.orderModel)
                    .subscribe(res => {
                      if (res) {
                        this.offerService.getByProductId(product.id)
                          .subscribe(offer_res => {
                            if (offer_res) {
                              offer_res[0].active = false
                              console.log(offer_res[0]);
                              // set offer active to false. i.e. delete the offer.
                              this.offerService.updateOffer(offer_res[0])
                                .subscribe(res => {
                                  console.log(res);
                                  if (res) {
                                    console.log(res)
                                    this.showToast(this.status, this.title, `Your Order sent successfully!`);
                                    this.router.navigateByUrl('/pages', { skipLocationChange: true }).then(() =>
                                      this.router.navigate(["/pages/order/myorders"]));
                                  }
                                })
                            }
                          })
                      }
                    })
                })
            })
        }
      })
  }

  // buyNow(product: any, offer: any) {
  //   console.log(product)
  //   console.log(offer)

  //   this.productService.getById(product.id)
  //     .subscribe(res => {
  //       if (res) {
  //         this.offeredProduct = res
  //         this.offeredProduct.quantity = offer.orderedQuantity
  //         this.offeredProduct.price = offer.offerPrice
  //         console.log(this.offeredProduct)
  //         this.sharedData.changeMessage(this.offeredProduct)
  //         this.dialogService.open(PaymentOrderModalComponent)
  //           .onClose.subscribe(res => {
  //             console.log(res)


  //           })
  //       }
  //     });



  //   //     if (res) {
  //   //       // delete the product from my cart if any.
  //   //       this.cartService.getMyCart(this.user)
  //   //         .subscribe(carts => {
  //   //           this.cartsModel = carts;
  //   //           console.log(carts)
  //   //           if (carts) {
  //   //             carts.forEach(cart => {

  //   //               if (cart.productId === orderProduct.id) {
  //   //                 cart.active = false;
  //   //                 this.cartService.deleteCart(cart).subscribe(res => {
  //   //                   if (res) {
  //   //                     console.log(res);
  //   //                   }
  //   //                 });
  //   //               }
  //   //             });
  //   //           }
  //   //         });
  //   //       //delete the product from my order.
  //   //       this.orders.forEach(order => {
  //   //         if (order.productId === orderProduct.id) {
  //   //           //this.cancelOrder(order);
  //   //           order.active = false
  //   //           this.orderService.deleteOrder(order)
  //   //             .subscribe(res => {
  //   //               if (res) {
  //   //                 console.log(res);
  //   //                 // this.showToast(this.status, this.title, `Your order canceled successfully!`);
  //   //                 // this.router.navigateByUrl('/pages/order', { skipLocationChange: true }).then(() =>
  //   //                 //   this.router.navigate(["/pages/order/myorders"]));
  //   //               }
  //   //             })
  //   //         }
  //   //       });
  //   //       if (orderProduct.quantity == 1) {
  //   //         //delete from home page
  //   //         orderProduct.active = false
  //   //         this.productService.updateProduct(orderProduct)
  //   //           .subscribe(res => {
  //   //             if (res) {
  //   //               this.showToast(this.status, this.title, `Your Payment is transfered successfully!`);
  //   //               this.router.navigateByUrl('/pages/order', { skipLocationChange: true }).then(() =>
  //   //                 this.router.navigate(["/pages/order/myorders"]));
  //   //             }
  //   //           })
  //   //       } else if (orderProduct.quantity > 1) {
  //   //         this.orderService.getByProductId(orderProduct.id)
  //   //           .subscribe((order_res) => {
  //   //             this.productService.getById(orderProduct.id)
  //   //               .subscribe((product_res: any) => {
  //   //                 product_res.quantity = product_res.quantity - order_res[0].orderedQuantity;
  //   //                 this.productService.updateProduct(product_res)
  //   //                   .subscribe(res => {
  //   //                     this.showToast(this.status, this.title, `Your Payment is transfered successfully!`);
  //   //                     this.router.navigateByUrl('/pages/order', { skipLocationChange: true }).then(() =>
  //   //                       this.router.navigate(["/pages/order/myorders"]));
  //   //                   })
  //   //               })
  //   //           })
  //   //       }
  //   //     }
  //   //   });
  // }

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
