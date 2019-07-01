import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-payment-order-modal',
  templateUrl: './payment-order-modal.component.html',
  styleUrls: ['./payment-order-modal.component.scss']
})
export class PaymentOrderModalComponent implements OnInit {

  public paymentOrder: any = {};
  constructor(protected dialogRef: NbDialogRef<PaymentOrderModalComponent>) { }

  ngOnInit() {
  }
  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.paymentOrder);
  }
}
