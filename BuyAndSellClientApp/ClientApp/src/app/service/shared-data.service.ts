import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  //public product: any;

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();


  constructor() { }

  // changeMessage(product: any) {
  //   //this.messageSource.next(product)
  // }
  changeMessage(message: string) {
    this.messageSource.next(message)
  }
}
