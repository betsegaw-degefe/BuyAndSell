import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbWindowRef } from '@nebular/theme';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { Subscription, Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OfferService } from 'src/app/service/offer.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/service/auth.service';


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

  constructor(public windowRef: NbWindowRef,
    private sharedData: SharedDataService,
    private offerservice: OfferService,
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

  submit() {
    this.offerservice.get(+this.selectedOffer)
      .subscribe(offer_res => {
        if (offer_res) {
          let offer: any = offer_res;
          offer.status = "Accepted"
          console.log(offer);
          this.offerservice.updateOffer(offer)
            .subscribe(res => {
              if (res) {
                console.log(res);
              }
            })
        }
      })

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
    this.windowRef.close();
  }

  close() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.windowRef.close();
  }
}
