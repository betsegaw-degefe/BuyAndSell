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

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  public user: any = {} // Container for UserId to send a request to /order/myorder endpoint
  public order: any = [] // Container for orders fetched from /order/myorder end point
  public products: any = [] // Container for product fetched from /product/{id} end point filtering by order.productId
  public starRate = 2; // Variable for storing the number of stars(rating).
  public readonly = true; // Variable to make the star(rating) readonly.

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
  ) { }

  ngOnInit() {
    this.user.UserId = 0;
    this.orderService.getMyOrder(this.user)
      .subscribe(res => {
        if (res) {
          console.log(res);
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

  buyNow(orderproduct: any) {
    console.log(orderproduct)
    this.dialogService.open(PaymentOrderModalComponent)
      .onClose.subscribe(res => {
        if (res) {
          console.log(res);
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
