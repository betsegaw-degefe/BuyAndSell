import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ProductAttributeValueService } from 'src/app/service/product-attribute-value.service';
import { PostProductService } from 'src/app/service/post-product.service';
import { OrderService } from 'src/app/service/order.service';
import { SharedOrderDataService } from 'src/app/service/shared-order-data.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  public product: any; // Container for a product received from shared service/offer-product.
  public productAttributeValue: any // Container for a list of product attribute value received from /productattributevalue/searchbyproductid end point.
  public attributeKey = []; // Container for a list product attribute(productAttribute.name only) received from /productattribute/{id} end point.
  public productKey = []; // Container for product table column names (price, condition...)to display in to prodct detail page.
  public productValue = []; // Container for product table data (like, 5000 birr for price)

  constructor(private dialogService: NbDialogService,
    private sharedData: SharedOrderDataService,
    private attributeValueService: ProductAttributeValueService,
    private attributeService: PostProductService,
    private toastrService: NbToastrService) { }

  ngOnInit() {
    var productAttributeIdArray = []; // Container for a list of product attribute id received from /productattributevalue/searchbyproductid end point.
    this.sharedData.currentMessage.subscribe(message => {
      console.log(this.sharedData.currentMessage)
      this.product = message
    });

    console.log(this.product);
    // get productattribute value of the selected product
    this.attributeValueService.getByProductId(this.product.id).subscribe(res => {
      //this.productAttributeValue = res;
      for (let index = 0; index < res.length; index++) {
        productAttributeIdArray[index] = res[index].productAttributeId;
        this.productAttributeValue[index] = res[index].value
      }
      for (let i = 0; i < productAttributeIdArray.length; i++) {
        this.attributeService.get(productAttributeIdArray[i])
          .subscribe(res => {
            if (res) {
              this.attributeKey[i] = res[i].name;
            }
          })
      }
      console.log(this.attributeKey)
    });
    var arrayCounter = 0; // counter for looping through product value.
    for (var key in this.product) {
      // Removing unnecessary key's from the array.
      if (key != "statusId" && key != "imageUrl" && key != "status" &&
        key != "order" && key != "createdAt" && key != "lastUpdated" &&
        key != "createdBy" && key != "active" && key != "productAttributeValue" &&
        key != "id"
      )
        // Checking the key value pair.
        if (this.product.hasOwnProperty(key)) {
          this.productKey[arrayCounter] = key;
          if (key === "price") {
            this.productValue[arrayCounter] = this.product[key] + " birr"
          } else {
            this.productValue[arrayCounter] = this.product[key]
          }
          arrayCounter++;
        }
    }
  }

}
