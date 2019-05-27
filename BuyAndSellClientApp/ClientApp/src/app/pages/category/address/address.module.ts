import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address.component';
import { NbCardModule, NbListModule, NbUserModule, NbAccordionModule, NbMenuModule,  } from '@nebular/theme';
import { AddressService } from 'src/app/service/address/address.service';
import { MatTreeModule } from '@angular/material';

@NgModule({
  declarations: [AddressComponent, ],
  imports: [
    CommonModule,
    NbCardModule,
    NbListModule,
    NbUserModule,
    NbAccordionModule,
    NbMenuModule,
    MatTreeModule,
  ],
  providers: [
    AddressService,
  ],
})
export class AddressModule { }
