import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedOrderDataService {
  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable()
  //currentMessage =  this.messageSource.value

  constructor() { }

  changeMessage(message: any) {
    //console.log(message)
    //this.messageSource.
    this.messageSource.next(message);
    //this.currentMessage = this.messageSource.asObservable();
    console.log(this.currentMessage);
    //console.log(this.messageSource.asObservable())
  }
}
