import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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

    //this.data.get().subscribe(data => this.addresses = data);
  }

  // items = [
  //   {
  //     title: 'Profile',
  //     expanded: true,
  //     children: [
  //       {
  //         title: 'Change Password',
  //         link: [], // goes into angular `routerLink`
  //       },
  //       {
  //         title: 'Privacy Policy',
  //         url: '#', // goes directly into `href` attribute
  //       },
  //       {
  //         title: 'Logout',
  //         link: [],
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Shopping Bag',
  //     children: [
  //       {
  //         title: 'First Product',
  //         link: [], // goes into angular `routerLink`
  //       },
  //       {
  //         title: 'Second Product',
  //         url: '#', // goes directly into `href` attribute
  //       },
  //       {
  //         title: 'Third Product',
  //         link: [],
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Orders',
  //     children: [
  //       {
  //         title: 'First Order',
  //         link: [], // goes into angular `routerLink`
  //       },
  //       {
  //         title: 'Second Order',
  //         url: '#', // goes directly into `href` attribute
  //       },
  //       {
  //         title: 'Third Order',
  //         link: [],
  //       },
  //     ],
  //   },
  // ];
}
