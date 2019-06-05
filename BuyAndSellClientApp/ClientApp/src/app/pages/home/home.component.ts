import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  currentTheme: string;
  themeSubscription: any;
  numbers: number;

  constructor(private themeService: NbThemeService, private router: Router) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });

  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
  redirect(){
    this.router.navigate(['/pages/productdetail'])
  }


}