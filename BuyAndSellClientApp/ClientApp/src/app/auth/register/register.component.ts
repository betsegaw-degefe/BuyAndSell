import { Component, Input, OnInit, Inject, ChangeDetectorRef, } from '@angular/core';
import { NbRegisterComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { parse } from 'querystring';
import { UserRoleService } from 'src/app/service/user-role.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';


@Component({
    selector: 'ngx-register',
    styleUrls: ['./register.component.scss'],
    templateUrl: './register.component.html',
})
export class RegisterComponent extends NbRegisterComponent implements OnInit {

    user: any = {};
    public userRole: any = {};
    message: any;
    public loading = false;

    // Variables related with success toast.
    destroyByClick = true;
    duration = 4000;
    hasIcon = true;
    position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    preventDuplicates = false;
    status: NbToastStatus = NbToastStatus.SUCCESS;
    title = 'Success!';

    constructor(private authService: AuthService,
        service: NbAuthService,
        private toastrService: NbToastrService,
        private userRoleService: UserRoleService,
        @Inject(NB_AUTH_OPTIONS) protected options = {}, cd: ChangeDetectorRef, router: Router) {
        super(service, options, cd, router)
    }

    ngOnInit() {
    }

    register() {
        this.loading = true;
        this.message = null;
        console.log(this.user.password);
        let address: Number = parseInt(<string>this.user.address);
        this.authService.register(this.user)
            .subscribe(res => {
                console.log(res);
                if (res.token) {
                    localStorage.setItem("token", res.token);

                }
                this.userRole.UserId = res.user.id;
                this.userRole.RoleId = 2;
                this.userRole.Active = true;
                console.log(this.userRole);
                this.userRoleService.register(this.userRole)
                    .subscribe(res => {
                        if (res) {
                            console.log(res);
                            this.showToast(this.status, this.title, `Welcome to Dagu Buy and sell!`);
                            this.router.navigate(['auth/login']);
                        }
                    })
            }, (err) => {
                console.log(err);
                this.message = err.error
                this.router.navigate(['auth/register']);
                this.loading = false;
            });
    }


    /**
   * A toast for success message
   * @param type : type of toast. eg. success, warning...
   * @param title : title of the toast. 
   * @param body : message for the toast.
   */
    private showToast(type: NbToastStatus, title: string, body: string) {
        const config = {
            status: type,
            destroyByClick: this.destroyByClick,
            duration: this.duration,
            hasIcon: this.hasIcon,
            position: this.position,
            preventDuplicates: this.preventDuplicates,
        };
        const titleContent = title ? `${title}` : '';

        this.toastrService.show(
            body,
            `${titleContent}`,
            config);
    }
}