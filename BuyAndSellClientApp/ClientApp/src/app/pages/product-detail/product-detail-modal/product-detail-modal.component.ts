import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { SharedDataService } from 'src/app/service/shared-data.service';

@Component({
  selector: 'app-product-detail-modal',
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.scss']
})
export class ProductDetailModalComponent implements OnInit {

  public order: any = {};
  public product: any;

  constructor(protected dialogRef: NbDialogRef<ProductDetailModalComponent>,
    private sharedData: SharedDataService) { }

  ngOnInit() {
    this.sharedData.currentMessage.subscribe(message => {
      this.product = message
      console.log(this.product)
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  submitOrder() {
    this.dialogRef.close(this.order);
  }
}
