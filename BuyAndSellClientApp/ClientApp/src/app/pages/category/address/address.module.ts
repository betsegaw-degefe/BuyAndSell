import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address.component';
import { NbCardModule, NbListModule, NbUserModule, NbAccordionModule } from '@nebular/theme';
import { AddressService } from 'src/app/service/address/address.service';

@NgModule({
  declarations: [AddressComponent, ],
  imports: [
    CommonModule,
    NbCardModule,
    NbListModule,
    NbUserModule,
    NbAccordionModule,
  ],
  providers: [
    AddressService,
  ],
})
export class AddressModule { }
