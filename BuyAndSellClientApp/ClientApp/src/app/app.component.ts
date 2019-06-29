import { Component, OnInit } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-app',
  styleUrls: ['./app.component.scss'],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private menuService: NbMenuService,
    private router: Router, ) { }

  ngOnInit() {
    this.menuService.onItemClick()
      .subscribe((event) => {
        this.onContecxtItemSelection(event.item.title);
      });
  }

  onContecxtItemSelection(title) {
    //console.log('click', title);
    if (title === "Log out") {
      this.logOut();
    }
  }

  logOut() {
    localStorage.removeItem("token");
    this.router.navigateByUrl('/pages/home');
  }
}