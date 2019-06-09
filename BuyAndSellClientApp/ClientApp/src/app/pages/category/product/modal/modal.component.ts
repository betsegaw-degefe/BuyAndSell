import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(protected dialogRef: NbDialogRef<ModalComponent>) { }

  ngOnInit() {
  }
  cancel() {
    this.dialogRef.close();
  }

  submit(name) {
    this.dialogRef.close(name);
  }
}
