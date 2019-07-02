import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  public confirm = true;

  constructor(protected dialogRef: NbDialogRef<DeleteModalComponent>) { }

  ngOnInit() {
  }
  cancel() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.confirm);
  }
}
