import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { ProductAttributeValueService } from 'src/app/service/product-attribute-value.service';
import { PostProductService } from 'src/app/service/post-product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

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

  constructor(private sharedData: SharedDataService,
    private attributeValueService: ProductAttributeValueService,
    private attributeService: PostProductService) { }

  ngOnInit() {
    var productAttributeIdArray = [];
    this.sharedData.currentMessage.subscribe(message => {
      this.product = message
    });
    console.log(this.product);
    // get productattribute value of the selected product
    this.attributeValueService.getByProductId(this.product.id).subscribe(res => {
      this.productAttributeValue = res;
      console.log(this.productAttributeValue);
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
        key != "id"
      )
        // Checking the key value pair.
        if (this.product.hasOwnProperty(key)) {
          //console.log(key + " -> " + this.product[key]);
          this.productKey[this.arrayCounter] = key;
          if (key === "price") {
            this.productValue[this.arrayCounter] = this.product[key] + " birr"
          } else {
            this.productValue[this.arrayCounter] = this.product[key]
          }
          this.arrayCounter++;
        }
    }
  }
}
