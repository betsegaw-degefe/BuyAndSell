import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { SharedDataService } from 'src/app/service/shared-data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products: any = []
  public imageUrl: any;
  public starRate = 2;
  public readonly = true;

  constructor(private data: ProductService,
    private router: Router,
    private sharedData: SharedDataService
  ) {

  }

  ngOnInit() {
    this.data.get()
      .subscribe(success => {
        if (success) {
          console.log(this.data.product);
          this.products = this.data.product; //
          this.products.forEach(element => {
            element.imageUrl = encodeURI('http://localhost:5000/' + element.imageUrl);
          });
        }
      });
  }

  redirect(product: any) {
    //console.log(product);
    //this.sharedData.changeMessage.subscribe(message => this.message = message)
    // this.sharedData.currentMessage.subscribe(message => productId = message)
    this.sharedData.changeMessage(product)
  
    this.router.navigate(['/pages/productdetail'])
  }
}