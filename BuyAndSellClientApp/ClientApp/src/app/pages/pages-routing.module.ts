import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PostProductComponent } from './post-product/post-product.component';
import { CartComponent } from './cart/cart.component';
import { identifierModuleUrl } from '@angular/compiler';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from 'src/guards/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'postproduct',
      component: PostProductComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'productdetail',
      component: ProductDetailComponent,
    },
    {
      path: 'orderdetail',
      component: OrderDetailComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'cart',
      component: CartComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [AuthGuard],
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: 'category',
      loadChildren: './category/category.module#CategoryModule',
      canActivate: [AuthGuard]
    },
    {
      path: 'order',
      loadChildren: './order/order.module#OrderModule',
      canActivate: [AuthGuard],
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    JwtHelperService,
    AuthGuard
  ]
})
export class PagesRoutingModule {
}
