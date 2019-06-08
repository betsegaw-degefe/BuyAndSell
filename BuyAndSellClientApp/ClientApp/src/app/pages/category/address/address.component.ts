import { Component, OnInit, } from '@angular/core';
import { AddressService } from 'src/app/service/address/address.service';
//import { AddressModel } from 'src/app/models/address-model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  public addresses = [];

  constructor(private data: AddressService) {
  }

  ngOnInit() {
    this.data.get()
      .subscribe(success => {
        if (success) {
          this.addresses = this.data.addresses
        }
      })
  }
}
