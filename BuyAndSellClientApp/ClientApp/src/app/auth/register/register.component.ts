import { Component, Input, } from '@angular/core';
import { NbRegisterComponent } from '@nebular/auth';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
    selector: 'ngx-register',
    styleUrls: ['./register.component.scss'],
    templateUrl: './register.component.html',
})
export class RegisterComponent extends NbRegisterComponent {
    @Input()
    httpRequestHeaders: HttpHeaders | {
        [header: string]: string | string[];
    } = new HttpHeaders().set("sampleHeader", "headerValue").set("sampleHeader1", "headerValue1");

    @Input()
    httpRequestParams: HttpParams | {
        [param: string]: string | string[];
    } = new HttpParams().set("sampleRequestParam", "requestValue").set("sampleRequestParam1", "requestValue1");

    public uploadEvent($event: any) {
        console.log('from client' + JSON.stringify($event));
    }
}