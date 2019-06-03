import { Component, Input, OnInit, Inject, ChangeDetectorRef, } from '@angular/core';
import { NbRegisterComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { parse } from 'querystring';


@Component({
    selector: 'ngx-register',
    styleUrls: ['./register.component.scss'],
    templateUrl: './register.component.html',
})
export class RegisterComponent extends NbRegisterComponent implements OnInit {

    user: any = {};

    constructor(private authService: AuthService, service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options = {}, cd: ChangeDetectorRef, router: Router) {
        super(service, options, cd, router)
    }

    ngOnInit() {
    }

    register() {
        console.log(this.user.password);
        let address: Number = parseInt(<string>this.user.address);
        this.user.address = address;
        this.authService.register(this.user)
            .subscribe(res => {
                console.log(res);
                if (res.token) {
                    localStorage.setItem("token", res.token);
                    this.router.navigate(['auth/login']);
                }
            }, (err) => {
                console.log(err);
            });
    }

    // @Input()
    // httpRequestHeaders: HttpHeaders | {
    //     [header: string]: string | string[];
    // } = new HttpHeaders().set("sampleHeader", "headerValue").set("sampleHeader1", "headerValue1");

    // @Input()
    // httpRequestParams: HttpParams | {
    //     [param: string]: string | string[];
    // } = new HttpParams().set("sampleRequestParam", "requestValue").set("sampleRequestParam1", "requestValue1");

    // public uploadEvent($event: any) {
    //     console.log('from client' + JSON.stringify($event));
    // }
}