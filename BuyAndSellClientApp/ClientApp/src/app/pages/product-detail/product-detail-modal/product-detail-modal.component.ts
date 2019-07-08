import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-detail-modal',
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.scss']
})
export class ProductDetailModalComponent implements OnInit {

  public order: any = {};
  public product: any;
  form: FormGroup;

  constructor(protected dialogRef: NbDialogRef<ProductDetailModalComponent>,
    private sharedData: SharedDataService,
    private formBuilder: FormBuilder, ) { }

  ngOnInit() {
    this.sharedData.currentMessage.subscribe(message => {
      this.product = message
      console.log(this.product)
      this.form = this.formBuilder.group({
        contact: [null, Validators.required],
        quantity: [null],
        offer: [null]
      });
    });
    console.log(this.product)

  }

  cancel() {
    this.dialogRef.close();
  }

  submitOrder() {
    console.log(this.form.value)
    this.dialogRef.close(this.form.value);
  }
}
