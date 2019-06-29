//import { JwtHelper } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    canActivate() {
        var token = localStorage.getItem("token");

        if (token && !this.jwtHelper.isTokenExpired(token)) {
            console.log(this.jwtHelper.decodeToken(token));
            return true;
        }
        this.router.navigate(["login"]);
        return false;
    }
    constructor(private jwtHelper: JwtHelperService, private router: Router) {
    }

}