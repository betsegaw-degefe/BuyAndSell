import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();
  //currentMessage =  this.messageSource.value

  constructor() { }

  changeMessage(message: any) {
    //console.log(message)
    this.messageSource.next(message);
    console.log(this.messageSource)
  }
}
