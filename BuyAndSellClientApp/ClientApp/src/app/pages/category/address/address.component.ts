import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/service/address/address.service';
// import { AddressModel } from 'src/app/models/address-model';

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
  // users: { name: string, title: string }[] = [
  //   { name: 'Carla Espinosa', title: 'Nurse' },
  //   { name: 'Bob Kelso', title: 'Doctor of Medicine' },
  //   { name: 'Janitor', title: 'Janitor' },
  //   { name: 'Perry Cox', title: 'Doctor of Medicine' },
  //   { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
  //   { name: 'Carla Espinosa', title: 'Nurse' },
  //   { name: 'Bob Kelso', title: 'Doctor of Medicine' },
  //   { name: 'Janitor', title: 'Janitor' },
  //   { name: 'Perry Cox', title: 'Doctor of Medicine' },
  //   { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
  // ];

}
