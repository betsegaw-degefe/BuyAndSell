import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-my-offers-modal',
  templateUrl: './my-offers-modal.component.html',
  styleUrls: ['./my-offers-modal.component.scss']
})
export class MyOffersModalComponent implements OnInit {

  public confirm = true;

  constructor(protected dialogRef: NbDialogRef<MyOffersModalComponent>) { }

  ngOnInit() {
  }
  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.confirm);
  }
}
