import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { CartService } from 'src/app/service/cart.service';
import { NbDialogService, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Router } from '@angular/router';
import { element } from '@angular/core/src/render3';
import { SharedDataService } from 'src/app/service/shared-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: any = [] // Container for list of products fetched from /cart/mycarts.
  //public imageUrl: any; // Container for holding the ima
  public cartsModel: any = [] //Container for list of carts fetched from /cart/mycarts.
  public user: any = {} // Container for UserId to send a request to /cart/mycarts endpoint

  public starRate = 2; // variable for the number of stars in the rating.
  public readonly = true; // variable to make the star/rating to readonly.

  // Variables related with success toast.
  destroyByClick = true;
  duration = 4000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbToastStatus = NbToastStatus.SUCCESS;
  title = 'Success!';

  constructor(private cartService: CartService,
    private dialogService: NbDialogService,
    private productService: ProductService,
    private toastrService: NbToastrService,
    private router: Router,
    private sharedData: SharedDataService,
  ) { }

  ngOnInit() {
    this.user.UserId = 0;
    this.cartService.getMyCart(this.user)
      .subscribe(carts => {
        this.cartsModel = carts;
        console.log(carts);
        if (carts) {
          carts.forEach(cart => {
            this.productService.getById(cart.productId)
              .subscribe(product => {
                if (product) {
                  console.log(product);
                  product.imageUrl = encodeURI('http://localhost:5000/' + product.imageUrl);
                  this.products.push(product);
                }
              })
          });
          console.log(this.products);
        }
      });
  }

  /**
   * cancel the cart that was ordered before.
   * @param model : product model that is selected from the cart page.
   */
  cancelCart(model: any) {
    //model.active = false;
    var cart: any = [];
    this.cartsModel.forEach(element => {
      if (element.productId === model.id) {
        cart = element;
      }
    });
    cart.active = false;
    // console.log(cart);
    this.dialogService.open(CartModalComponent)
      .onClose.subscribe(res => {
        //console.log(res);
        if (res) {
          this.cartService.deleteCart(cart)
            .subscribe(res => {
              if (res) {
                this.showToast(this.status, this.title, `Your Cart canceled successfully!`);
                this.router.navigateByUrl('/pages', { skipLocationChange: true }).then(() =>
                  this.router.navigate(["/pages/cart"]));
              }
            });
        }
      });
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

  redirect(product: any) {
    //console.log(product);
    //this.sharedData.changeMessage.subscribe(message => this.message = message)
    // this.sharedData.currentMessage.subscribe(message => productId = message)
    this.sharedData.changeMessage(product)
  
    this.router.navigate(['/pages/productdetail'])
  }
}
