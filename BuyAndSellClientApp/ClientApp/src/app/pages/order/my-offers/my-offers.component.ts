import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/service/offer.service';
import { ProductService } from 'src/app/service/product.service';
import { NbDialogService, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { MyOffersModalComponent } from './my-offers-modal/my-offers-modal.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss']
})
export class MyOffersComponent implements OnInit {

  public user: any = {} // Container for UserId to send a request to /order/myorder endpoint
  public products: any = [] // Container for product fetched from /product/{id} end point filtering by order.productId
  public offers: any = [] // Container for offers fetched from /offer/myoffer end point
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

  constructor(private offerService: OfferService,
    private productService: ProductService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private router: Router, ) { }

  ngOnInit() {
    this.user.UserId = 0;
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
              })
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
          this.offerService.deleteOffer(model)
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
