import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-post-product-modal',
  templateUrl: './post-product-modal.component.html',
  styleUrls: ['./post-product-modal.component.scss']
})
export class PostProductModalComponent implements OnInit {

  selectedItem = 'Text';

  public attribute: any = [];

  constructor(protected dialogRef: NbDialogRef<PostProductModalComponent>) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  submit(name, dataType) {
    this.attribute.push(name);
    this.attribute.push(this.selectedItem);
    this.dialogRef.close(this.attribute);
  }
}
