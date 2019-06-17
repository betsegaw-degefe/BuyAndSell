import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
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

  constructor(private data: ProductService, private router: Router) {
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

  redirect(){
    this.router.navigate(['/pages/productdetail'])
  }
}