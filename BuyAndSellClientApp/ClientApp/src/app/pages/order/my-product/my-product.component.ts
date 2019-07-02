import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { AuthGuard } from 'src/guards/auth-guard.service';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService, NbGlobalPosition, NbGlobalPhysicalPosition } from '@nebular/theme';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'app-my-product',
  templateUrl: './my-product.component.html',
  styleUrls: ['./my-product.component.scss']
})
export class MyProductComponent implements OnInit {

  public myProducts: any = [] // Container for products fetched from /product/myproducts end point.
  public user: any = {} //Container for holding the current user.
  public userId: any = {} // Variable to hold the current user id to send a rewuest to /product/myproducts end point.
  public starRate = 2; // Variable for storing the number of stars(rating).
  public readonly = true; // Variable to make the star(rating) readonly.


  // Variables related with success toast.
  destroyByClick = true;
  duration = 4000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbToastStatus = NbToastStatus.SUCCESS;
  title = 'Success!';

  constructor(
    private productService: ProductService,
    private sharedData: SharedDataService,
    private authGuard: AuthGuard,
    private router: Router,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService, ) { }

  ngOnInit() {
    this.user = this.authGuard.CURRENT_USER;
    this.userId.UserId = this.user.nameid;
    this.productService.getMyProducts(this.userId)
      .subscribe(resmyproducts => {
        if (resmyproducts) {
          resmyproducts.forEach(element => {
            element.imageUrl = encodeURI('http://localhost:5000/' + element.imageUrl);
            this.myProducts.push(element);
          });
        }
        console.log(this.myProducts)
      })
  }

  /**
   * 
   */
  openEdit(product: any) {
    console.log(product);
    this.sharedData.changeMessage(product)
    this.router.navigate(['/pages/order/editmyproduct'])
  }

  deleteProduct(product: any) {
    product.active = false;
    console.log(product);
    this.dialogService.open(DeleteModalComponent)
      .onClose.subscribe(res => {
        if (res) {
          console.log(res);
          this.productService.deleteProduct(product)
            .subscribe(res => {
              if (res) {
                console.log(res);
                this.showToast(this.status, this.title, `Your Product canceled successfully!`);
                this.router.navigateByUrl('/pages/order', { skipLocationChange: true }).then(() =>
                  this.router.navigate(["/pages/order/myproducts"]));
              }
            })
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
