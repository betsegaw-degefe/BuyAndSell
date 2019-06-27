import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { SharedDataService } from 'src/app/service/shared-data.service';

@Component({
  selector: 'app-add-cart-modal',
  templateUrl: './add-cart-modal.component.html',
  styleUrls: ['./add-cart-modal.component.scss']
})
export class AddCartModalComponent implements OnInit {
  public confirm = true;

  constructor(protected dialogRef: NbDialogRef<AddCartModalComponent>,
  ) { }


  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.confirm);
  }
}
