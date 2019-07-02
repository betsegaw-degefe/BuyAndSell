import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { ProductAttributeValueService } from 'src/app/service/product-attribute-value.service';
import { ProductAttributeService } from 'src/app/service/product-attribute.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  public product: any; // Container for a product received from my products page.
  negotiable = true; // radio button value for negotiable.
  public productProperties: any = []; // Container for product Attribute received from the /productattribute/(productAttribute table).
  public productAttributeValue: any = []; // Container for product Attribute value received from the /productattributevalue/searchbyproductid.
  public productPropertyKey: any = [] // container for holding key of product property. eg. [Brand Name, Color,...].
  public productPropertyValue: any = [] // container for holding value of product property. eg. [Wrangler Authentics, Black,...].
  type: any = [] // data type of the productPropertyKey to define the text box.
  counter: number = 0; // for tracking the productPropertyKey, productPropertyValue and type arrays.

  constructor(private sharedData: SharedDataService,
    private productAttributeValueService: ProductAttributeValueService,
    private productAttributeService: ProductAttributeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sharedData.currentMessage.subscribe(message => {
      this.product = message // get product from the my product page
      this.negotiable = this.product.negotiable;
      this.productAttributeValueService.getByProductId(this.product.id)
        .subscribe(res => {
          if (res) {
            this.productAttributeValue = res
            console.log(this.productAttributeValue);
            this.productAttributeValue.forEach(element => {
              this.productAttributeService.getById(element.productAttributeId)
                .subscribe(res => {
                  if (res) {
                    this.productProperties.push(res);
                    console.log(this.productProperties);
                    this.productPropertyKey[this.counter] = res.name;
                    this.productPropertyValue[this.counter] = element.value;
                    this.type[this.counter] = res.dataType;
                    this.counter++
                  }
                })
            });
          }
        })
    });
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  cancel() {
    this.router.navigate(['/pages/order/myproducts'])
  }

  saveProduct() {

    this.productAttributeValue.forEach(productProperty => {
      for (let index = 0; index < this.productPropertyKey.length; index++) {
        for (let j = 0; j < this.productProperties.length; j++) {
          if (this.productPropertyKey[index] === this.productProperties[j].name &&
            this.productProperties[j].id === productProperty.productAttributeId) {
            productProperty.value = this.productPropertyValue[index];
          }
        }
      }
    });
    this.productAttributeValueService.update(this.productAttributeValue)
      .subscribe(res => {
        if (res) {
          console.log(res);
        }
      })
  }
}
