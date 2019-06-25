import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyOffersComponent } from './my-offers/my-offers.component';
import { OrderComponent } from './order.component';

const routes: Routes = [{
  path: '',
  component: OrderComponent,
  children: [
    {
      path: 'myorders',
      component: MyOrdersComponent,
    },
    {
      path: 'myoffers',
      component: MyOffersComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
