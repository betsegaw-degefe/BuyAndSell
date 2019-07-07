import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/service/payment.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-payment-order-modal',
  templateUrl: './payment-order-modal.component.html',
  styleUrls: ['./payment-order-modal.component.scss']
})
export class PaymentOrderModalComponent implements OnInit {

  public paymentOrder: any = {};
  public receiverAccount: any = {};
  public orderProduct: any = {}; // Container for a product passed from my-order-component through shared service.
  public pinCode: any = {}; // Container for a pincode to send a request to /paymentservice/paymentpincode
  public sellerPaymentService: any = {} // Seller paymentService table fetched from /paymentservice/paymentpincode
  private buyer_acc_error: any;
  private seller_acc_error: any;
  public disableBtn: boolean = true;
  form: FormGroup;
  public loading = false;

  constructor(protected dialogRef: NbDialogRef<PaymentOrderModalComponent>,
    private sharedData: SharedDataService,
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    private authService: AuthService, ) { }

  ngOnInit() {
    this.sharedData.currentMessage.subscribe(message => {
      this.orderProduct = message;
      console.log(this.orderProduct);
    })

    this.form = this.formBuilder.group({
      ownerpinCode: [null, Validators.required],
      password: [null, Validators.required],
      receiverPinCode: [null, Validators.required],
    });
  }
  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.loading = true;
    this.paymentOrder.Withdraw = this.orderProduct.price;

    this.paymentService.PayPayment(this.paymentOrder)
      .subscribe(payment_res => {
        if (payment_res) {
          this.paymentService.GetByPinCode(this.receiverAccount)
            .subscribe((seller_acc: any) => {
              console.log(seller_acc)
              if (seller_acc) {
                this.sellerPaymentService = seller_acc
                this.sellerPaymentService.balance = seller_acc.balance + this.orderProduct.price;
                this.paymentService.AddBalace(this.sellerPaymentService)
                  .subscribe(added_res => {
                    console.log(added_res)
                    if (added_res) {
                      this.loading = false;
                      this.dialogRef.close(this.paymentOrder);
                    }
                  })
              }
            }, error => {
              if (error.status === 404) {
                this.buyer_acc_error = "Payment receiver phone number is not found!"
                this.loading = false;
              }
            })
        }
      }, error => {
        if (error.status === 404) {
          this.buyer_acc_error = "Your phone number is not found!"
          this.loading = false;
        } else if (error.status === 401) {
          this.buyer_acc_error = "Your password is incorrect!"
          this.loading = false;
        }
      })
  }
}
