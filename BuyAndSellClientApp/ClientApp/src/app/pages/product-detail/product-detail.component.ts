import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { ProductAttributeValueService } from 'src/app/service/product-attribute-value.service';
import { PostProductService } from 'src/app/service/post-product.service';
import { NbDialogService, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ProductDetailModalComponent } from './product-detail-modal/product-detail-modal.component';
import { OrderService } from 'src/app/service/order.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { OfferService } from 'src/app/service/offer.service';
import { Router } from '@angular/router';
import { AddCartModalComponent } from './add-cart-modal/add-cart-modal.component';
import { CartService } from 'src/app/service/cart.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from 'src/guards/auth-guard.service';
import { ProductService } from 'src/app/service/product.service';
import { getLocaleDateTimeFormat } from '@angular/common';
import * as moment from 'moment';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  public current_user: any = {} // Container for holding the current user.
  public user: any = {} // Container for UserId to send a request to /offer/myoffers endpoint
  public product: any;
  public productAttributeValue: any;
  public productAttributeName = []; // Container for product attribute name.
  public productKey = [];
  public productValue = [];
  public attributeKey = [];
  public attributeValue = [];
  public arrayCounter = 0;
  public starRate = 2;
  public readonly = true;
  public orderModel: any = {} // Container for Order to send to Order table.
  public offerModel: any = {}; // Container for offer to send a post request to /offer/register.
  public cartModel: any = {}; // Containers for cart to send a post request to /cart/register.
  public offered: boolean = false; // boolean value used to trace whether the product is offered by the current user or not.
  public ordered: boolean = false; // boolean value used to trace whether the product is ordered by the current user or not.
  public cartAdded: boolean = false; // boolean value used to trace whether the product is added to cart or not.
  public logged_in: boolean = false; // boolean value to track whether the user logged in or not logged in.
  public productOwner: boolean = false; // boolean value to track whether the product is owned by current user or not.
  public seller: any = {}

  // Variables related with success toast.
  destroyByClick = true;
  duration = 4000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbToastStatus = NbToastStatus.SUCCESS;
  title = 'Success!';
  //content = `The Order sent successfully!`;

  constructor(private dialogService: NbDialogService,
    private sharedData: SharedDataService,
    private attributeValueService: ProductAttributeValueService,
    private attributeService: PostProductService,
    private orderService: OrderService,
    private toastrService: NbToastrService,
    private offerService: OfferService,
    private cartService: CartService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private authGuard: AuthGuard,
    private productService: ProductService,
    private authService: AuthService,
  ) {
    var token = localStorage.getItem("token");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.current_user = this.jwtHelper.decodeToken(token);
      this.logged_in = true;
    }
  }

  ngOnInit() {
    var productAttributeIdArray = [];
    this.sharedData.currentMessage.subscribe(message => {
      this.product = message
      console.log(this.product);
      this.productService.getById(this.product.id)
        .subscribe(product_res => {
          if (product_res) {
            this.product.createdBy = product_res.createdBy;
            if (this.product.createdBy === +this.current_user.nameid) {
              this.productOwner = true;
            }
            this.authService.getUserById(product_res.createdBy)
              .subscribe((user_res) => {
                console.log(user_res);
                this.seller = user_res
              })
          }
        })
      // this.authService.getUserById(this.product.createdBy)
      //   .subscribe((user_res) => {
      //     console.log(user_res);
      //   })
    });

    // get productattribute value of the selected product
    this.attributeValueService.getByProductId(this.product.id).subscribe(res => {
      this.productAttributeValue = res;
      for (let index = 0; index < this.productAttributeValue.length; index++) {
        productAttributeIdArray[index] = this.productAttributeValue[index].productAttributeId;
        this.attributeValue[index] = this.productAttributeValue[index].value
      }
      for (let i = 0; i < productAttributeIdArray.length; i++) {
        this.attributeService.get(productAttributeIdArray[i])
          .subscribe(res => {
            if (res) {
              this.productAttributeName[i] = res;
              this.attributeKey[i] = this.productAttributeName[i].name;
            }
          })
      }
      console.log(this.productAttributeName)
    });
    for (var key in this.product) {
      // Removing unnecessary key's from the array.
      if (key != "statusId" && key != "imageUrl" && key != "status" &&
        key != "order" && key != "createdAt" && key != "lastUpdated" &&
        key != "createdBy" && key != "active" && key != "productAttributeValue" &&
        key != "id" && key != "cart" && key != "category" && key != "mainCategoryId"
        && key != "contact"
      )
        // Checking the key value pair.
        if (this.product.hasOwnProperty(key)) {
          //console.log(key + " -> " + this.product[key]);
          this.productKey[this.arrayCounter] = key;
          if (key === "price") {
            this.productValue[this.arrayCounter] = this.product[key] + " birr"
          } else if (key === "negotiable") {
            if (this.product[key]) {
              this.productValue[this.arrayCounter] = "Negotiable"
            } else if (!this.product[key]) {
              this.productValue[this.arrayCounter] = "Not Negotiable"
            }
          } else {
            this.productValue[this.arrayCounter] = this.product[key]
          }
          this.arrayCounter++;
        }
    }
    // check whether there is an offer for the product or not.
    this.user.UserId = this.current_user.nameid;
    this.offerService.getMyOffer(this.user)
      .subscribe(res => {
        res.forEach(offer => {
          if (this.product.id === offer.productId) {
            this.offered = true;
          }
        });
      });

    // check whether the product is added to cart or not.
    this.cartService.getMyCart(this.user)
      .subscribe(res => {
        res.forEach(cart => {
          if (this.product.id === cart.productId) {
            this.cartAdded = true;
          }
        });
      });

    // check whether the product is ordered or not.
    this.orderService.getMyOrder(this.user)
      .subscribe(res => {
        res.forEach(element => {
          if (this.product.id === element.productId) {
            this.ordered = true;
          }
        });
      })
  }

  /**
   * Order/offer for a product.
   */
  order() {
    console.log(this.product);
    // open order modal.
    this.dialogService.open(ProductDetailModalComponent)
      .onClose.subscribe(res => {
        console.log(res);
        if (res != null) {
          // if the product is negotiable.
          if (res.offer != null) {
            if (res.quantity != null)
              this.offerModel.orderedQuantity = res.quantity;
            else
              this.offerModel.orderedQuantity = 1;
            this.offerModel.ProductId = this.product.id;
            this.offerModel.OfferPrice = res.offer;
            this.offerModel.Status = "Waiting for Approval."
            this.offerModel.CreatedBy = this.current_user.nameid;
            this.offerModel.Active = true;
            console.log(this.offerModel);
            this.offerService.register(this.offerModel)
              .subscribe(res => {
                if (res) {
                  this.productService.getById(this.product.id)
                    .subscribe(product_res => {
                      if (product_res) {
                        //product_res.lastUpdated = moment().unix();
                        console.log(product_res);
                        this.productService.updateProduct(product_res)
                          .subscribe(update_res => {
                            console.log(update_res);
                            this.showToast(this.status, this.title, `Your Offer sent successfully!`);
                            this.router.navigateByUrl('/pages', { skipLocationChange: true }).then(() =>
                              this.router.navigate(["/pages/productdetail"]));
                          })
                      }
                    })
                  //this.product.astUpdated = moment().toISOString();
                }
              })
          }
          // if the product is not negotiable. The order saved to order table.
          else {
            this.productService.getById(this.product.id)
              .subscribe(product_res => {
                 if (this.product.quantity === 1) {
                product_res.statusId = 3
              }
                this.productService.updateProduct(product_res)
                  .subscribe(updated_res => {
                    console.log(updated_res);
                  })
              })
            this.orderModel.ProductId = this.product.id;
            this.orderModel.SellerId = this.product.createdBy;
            this.orderModel.BuyerId = this.current_user.nameid;
            this.orderModel.CreatedBy = this.current_user.nameid;
            if (res.quantity == null)
              this.orderModel.OrderedQuantity = 1;
            else
              this.orderModel.OrderedQuantity = res.quantity;
            this.orderModel.Contact = res.contact;
            this.orderModel.Active = true;
            this.orderService.register(this.orderModel)
              .subscribe(res => {
                if (res) {
                  console.log(res)
                  this.showToast(this.status, this.title, `Your Order sent successfully!`);
                  this.router.navigateByUrl('/pages', { skipLocationChange: true }).then(() =>
                    this.router.navigate(["/pages/productdetail"]));
                }
              })
          }
        }
      })
  }

  /**
   * Add to cart.
   */
  addToCart() {
    this.dialogService.open(AddCartModalComponent)
      .onClose.subscribe(res => {
        //console.log(res)
        if (res) {
          this.cartModel.ProductId = this.product.id;
          this.cartModel.Active = true;
          this.cartModel.CreatedBy = this.current_user.nameid;
          this.cartService.register(this.cartModel)
            .subscribe(res => {
              this.showToast(this.status, this.title, `Your product added to your cart successfully!`);
              this.router.navigateByUrl('/pages', { skipLocationChange: true }).then(() =>
                this.router.navigate(["/pages/productdetail"]));
            });
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
