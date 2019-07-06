import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public current_user: any = {} // Container for holding the current user.


  constructor(private authService: AuthService,
    private jwtHelper: JwtHelperService, ) {
    var token = localStorage.getItem("token");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.current_user = this.jwtHelper.decodeToken(token);
    }
  }

  ngOnInit() {
    this.authService.getUserById(this.current_user.nameid)
      .subscribe(user_res => {
        console.log(user_res)
      })
  }

}
