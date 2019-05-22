import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

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

  constructor() { }

  ngOnInit() {
  }
  menu = MENU_ITEMS;
}
