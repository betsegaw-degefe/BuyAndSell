import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProductService } from 'src/app/service/product.service';
import { AuthService } from 'src/app/service/auth.service';
import { NbDialogService, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { MyOffersModalComponent } from '../my-offers/my-offers-modal/my-offers-modal.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-product-order',
  templateUrl: './my-product-order.component.html',
  styleUrls: ['./my-product-order.component.scss']
})
export class MyProductOrderComponent implements OnInit {

  public current_user: any = {} // Container for holding the current user.
  public user: any = {} // Container for UserId to send a request to /order/myproductorder endpoint.
  public myProductOrders: any = []  // Container for product fetched from /order/myproductorder end point filtering by order.sellerId.
  public products: any = []

  // Variables related with success toast.
  destroyByClick = true;
  duration = 4000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbToastStatus = NbToastStatus.SUCCESS;
  title = 'Success!';


  constructor(private orderService: OrderService,
    private jwtHelper: JwtHelperService,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService, ) {
    var token = localStorage.getItem("token");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.current_user = this.jwtHelper.decodeToken(token);
    }
  }

  ngOnInit() {
    this.user.UserId = this.current_user.nameid;
    this.orderService.getMyProductOrder(this.user)
      .subscribe((order_res) => {
        console.log(order_res);
        this.myProductOrders = order_res;
        this.myProductOrders.forEach(product => {
          this.productService.getById(product.productId)
            .subscribe(product_res => {
              if (product_res) {
                product_res.imageUrl = encodeURI('http://localhost:5000/' + product_res.imageUrl);
                this.authService.getUserById(product.buyerId)
                  .subscribe(user_res => {
                    if (user_res) {
                      product_res.createdBy = user_res.firstName;
                      product_res.contact = product.contact;
                      this.products.push(product_res);
                    }
                  })
              }
            })
          console.log(this.products);
        });
      })
  }

  cancelOrder(model: any) {
    model.active = false;
    console.log(model)
    this.dialogService.open(MyOffersModalComponent)
      .onClose.subscribe(res => {
        if (res) {
          this.orderService.deleteOrder(model)
            .subscribe(res => {
              if (res) {
                //console.log(res);
                this.showToast(this.status, this.title, `You cancel an order successfully!`);
                this.router.navigateByUrl('/pages/order', { skipLocationChange: true }).then(() =>
                  this.router.navigate(["/pages/order/myproductorders"]));
              }
            })
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
