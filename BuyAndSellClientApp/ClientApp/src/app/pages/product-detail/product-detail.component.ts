import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { ProductAttributeValueService } from 'src/app/service/product-attribute-value.service';
import { PostProductService } from 'src/app/service/post-product.service';
import { NbDialogService, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ProductDetailModalComponent } from './product-detail-modal/product-detail-modal.component';
import { OrderService } from 'src/app/service/order.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { OfferService } from 'src/app/service/offer.service';

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
  public orderModel: any = {} // Container for Order to send to Order table.
  public offerModel: any = {}; // Container for offer to send post request to /offer/register.

  // Variables related with success toast.
  destroyByClick = true;
  duration = 4000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbToastStatus = NbToastStatus.SUCCESS;
  title = 'Success!';
  //content = `The Order sent successfully!`;

  constructor(private dialogService: NbDialogService,
    private sharedData: SharedDataService,
    private attributeValueService: ProductAttributeValueService,
    private attributeService: PostProductService,
    private orderService: OrderService,
    private toastrService: NbToastrService,
    private offerService: OfferService,
  ) { }

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

  /**
   * Order a product.
   */
  order() {
    // open order modal.
    this.dialogService.open(ProductDetailModalComponent)
      .onClose.subscribe(res => {
        if (res != null) {
          // if the product is negotiable.
          if (res.offer != null) {
            this.offerModel.ProductId = this.product.id;
            this.offerModel.OfferPrice = res.offer;
            this.offerModel.Status = "Waiting for Approval."
            this.offerModel.Active = true;
            //console.log(this.offerModel);
            this.offerService.register(this.offerModel)
              .subscribe(res => {
                if (res) {
                  this.showToast(this.status, this.title, `Your Offer sent successfully!`);
                }
              })
          }
          // if the product is not negotiable. The order saved to order table.
          else {
            this.orderModel.ProductId = this.product.id;
            this.orderModel.SellerId = this.product.createdBy;
            if (res.quantity == null)
              this.orderModel.OrderedQuantity = 1;
            else
              this.orderModel.OrderedQuantity = res.quantity;
            this.orderModel.Active = true;
            this.orderService.register(this.orderModel)
              .subscribe(res => {
                if (res) {
                  console.log(res)
                  this.showToast(this.status, this.title, `Your Order sent successfully!`);
                }
              })
            console.log(this.orderModel)
          }
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
