import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public current_user: any = {} // Container for holding the current user from token.
  public user: any = {} // Container for holding the current user from /account/{id} end point.
  public updatedUserModel: any = {} // Container for holding a user data submited from edited page to pass to /account/updatestatus end point.
  public editPage: boolean = false; // Variable for tracking whether the edit page button is clicked or not. 

  constructor(private authService: AuthService,
    private jwtHelper: JwtHelperService, ) {
    var token = localStorage.getItem("token");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.current_user = this.jwtHelper.decodeToken(token);
    }
    console.log(this.current_user);
  }

  ngOnInit() {
    this.authService.getUserById(this.current_user.nameid)
      .subscribe(user_res => {
        this.updatedUserModel = user_res;
        this.user = user_res;
      })
  }
  openEdit() {
    this.editPage = true;
  }

  updateProfile() {
    console.log(this.updatedUserModel);
    this.authService.updateUser(this.updatedUserModel)
      .subscribe((user_res: any) => {
        console.log(user_res);
      })
  }

  changeTimeFormat(model: any) {
    return moment(model).fromNow();
  }

}
