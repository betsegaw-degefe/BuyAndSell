import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';
import { AddressComponent } from './address/address.component';

const routes: Routes = [{
  path: '',
  component: CategoryComponent,
  children: [
    {
      path: 'address',
      component: AddressComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
