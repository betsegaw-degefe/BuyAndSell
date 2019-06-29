import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {

  public confirm = true;

  constructor(protected dialogRef: NbDialogRef<CartModalComponent>) { }

  ngOnInit() {
  }
  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.confirm);
  }
}
