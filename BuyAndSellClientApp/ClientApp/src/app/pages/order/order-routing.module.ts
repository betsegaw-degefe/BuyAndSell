import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyOffersComponent } from './my-offers/my-offers.component';
import { OrderComponent } from './order.component';
import { MyProductComponent } from './my-product/my-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { MyProductOrderComponent } from './my-product-order/my-product-order.component';

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
    },
    {
      path: 'myproducts',
      component: MyProductComponent,
    },
    {
      path: 'myproductorders',
      component: MyProductOrderComponent,
    },
    {
      path: 'editmyproduct',
      component: EditProductComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
