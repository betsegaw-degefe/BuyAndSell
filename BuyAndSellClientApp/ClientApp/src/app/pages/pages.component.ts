import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MENU_ITEMS, ADMIN_MENU_ITEMS } from './pages-menu';
import { AuthGuard } from 'src/guards/auth-guard.service';

@Component({
  selector: 'ngx-pages',
  templateUrl: './pages.component.html',
  // template: `
  //   <ngx-sample-layout>
  //     <nb-menu [items]="menu"></nb-menu>
  //     <router-outlet></router-outlet>
  //   </ngx-sample-layout>
  // `,
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  public user: any = {} //Container for holding the current user.
  public role: any; // Container for holding role of the current user.
  menu = MENU_ITEMS;
  adminMenu = ADMIN_MENU_ITEMS;
  constructor(private authGuard: AuthGuard, private jwtHelper: JwtHelperService) { }

  ngOnInit() {
    var token = localStorage.getItem("token");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      console.log(this.jwtHelper.decodeToken(token));
      this.user = this.jwtHelper.decodeToken(token);
      this.role = this.user.role;
    }
  }
}
