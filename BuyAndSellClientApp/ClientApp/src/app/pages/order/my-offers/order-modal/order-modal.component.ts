import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { SharedDataService } from 'src/app/service/shared-data.service';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss']
})
export class OrderModalComponent implements OnInit {

  public order: any = {};
  public product: any;
  public confirm:boolean = true;

  constructor(protected dialogRef: NbDialogRef<OrderModalComponent>,
    private sharedData: SharedDataService) { }

  ngOnInit() {
    // this.sharedData.currentMessage.subscribe(message => {
    //   this.product = message
    //   console.log(this.product)
    // });
  }

  cancel() {
    this.dialogRef.close();
  }

  submitOrder(){
    this.dialogRef.close(this.confirm);
  }


}
