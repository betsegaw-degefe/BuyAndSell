import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbWindowRef, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService, NbDialogRef } from '@nebular/theme';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { Subscription, Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OfferService } from 'src/app/service/offer.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/service/auth.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ProductService } from 'src/app/service/product.service';


@Component({
  selector: 'app-offer-list-modal',
  templateUrl: './offer-list-modal.component.html',
  styleUrls: ['./offer-list-modal.component.scss']
})


export class OfferListModalComponent implements OnInit, OnDestroy {

  public product: any; // Container for a product received from my products page.
  public offers: any = [] // Container for a offers received from /offers/searchbyproductid
  subscription: Subscription;
  private unsubscribe$: Subject<any> = new Subject<any>();
  public selectedOffer: any;

  // Variables related with success toast.
  destroyByClick = true;
  duration = 4000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbToastStatus = NbToastStatus.SUCCESS;
  title = 'Success!';

  constructor(protected dialogRef: NbDialogRef<OfferListModalComponent>,
    private sharedData: SharedDataService,
    private offerservice: OfferService,
    private toastrService: NbToastrService,
    private productService: ProductService,
    private authService: AuthService, ) {
    this.subscription = this.sharedData.currentMessage
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        message => {
          this.product = message // get product from the my product page
          console.log(this.product)
        }
      );
  }

  ngOnInit() {
    this.offerservice.getByProductId(this.product.id)
      .subscribe(offer_res => {
        if (offer_res) {
          console.log(offer_res);
          this.offers = offer_res;
          this.offers.forEach(element => {
            element.createdAt = moment(element.createdAt).fromNow();
            this.authService.getUserById(element.createdBy)
              .subscribe(res => {
                if (res) {
                  console.log(res);
                  element.createdBy = res.firstName;
                }
              })
          });
        }
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    if (this.selectedOffer != undefined) {
      this.offerservice.get(+this.selectedOffer)
        .subscribe(offer_res => {
          if (offer_res) {
            let offer: any = offer_res;
            offer.status = "Accepted"
            console.log(offer);
            this.offerservice.updateOffer(offer)
              .subscribe(offer_res => {
                if (offer_res) {
                  this.productService.getById(offer_res.productId)
                    .subscribe(product_res => {
                      if (product_res) {
                        product_res.price = offer_res.offerPrice
                        this.productService.updateProduct(product_res)
                          .subscribe(updatedProduct_res => {
                            console.log(updatedProduct_res);
                            this.showToast(this.status, this.title, `You accept an offer successfully!`);
                          })
                      }
                    })
                }
              })
          }
        })
    }

    // this.offers.forEach(element => {
    //   if (element.id === +this.selectedOffer) {
    //     element.status = "Accepted";
    //     console.log(element);

    //     // this.offerservice.updateOffer(element)
    //     //   .subscribe(res => {
    //     //     if (res) {
    //     //       console.log(res);
    //     //     }
    //     //   })
    //   }
    // });
    this.dialogRef.close();
  }

  close() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.dialogRef.close();
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
