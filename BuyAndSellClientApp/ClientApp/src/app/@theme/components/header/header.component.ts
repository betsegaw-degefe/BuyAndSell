import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { AuthService } from 'src/app/service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  public user: any = {};
  public current_user: any = {} // Container for holding the current user.
  public logged_in: boolean = false;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserData,
    private analyticsService: AnalyticsService,
    private authService: AuthService,
    private jwtHelper: JwtHelperService,
    private router: Router

  ) {
    var token = localStorage.getItem("token");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.current_user = this.jwtHelper.decodeToken(token);
      this.logged_in = true;
    }
  }

  ngOnInit() {
    // this.userService.getUsers()
    //   .subscribe((users: any) => this.user = users.nick);
    // this.authService.getUserById(this.current_user.nameid)
    //   .subscribe((users: any) => this.user = users.nick)
    this.user = this.current_user;
    console.log(this.user)
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  goToLogin() {
    this.router.navigateByUrl('/auth');
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }


}
