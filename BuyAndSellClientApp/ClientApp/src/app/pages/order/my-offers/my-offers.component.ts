import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/service/offer.service';
import { ProductService } from 'src/app/service/product.service';

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

  constructor(private offerService: OfferService,
    private productService: ProductService, ) { }

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
            console.log(this.products)
          });
        }
      })
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
