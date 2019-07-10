import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { NbLoginComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends NbLoginComponent implements OnInit {

  user: any = {};
  message: any;
  public loading = false;

  constructor(private authService: AuthService, service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options = {}, cd: ChangeDetectorRef, router: Router) {
    super(service, options, cd, router);
  }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    this.message = null;
    //this.router.navigate(['pages/agent']);
    //console.log(this.user);
    this.authService.login(this.user)
      .subscribe(res => {

        if (res.token) {
          localStorage.setItem("token", res.token);
          this.router.navigate(['pages']);
          //this.loading = false;
        }
      }, (err) => {
        if (err.status == 401) {
          this.message = "User name or password incorrect!"
          this.loading = false;
        }
      });
  }
}