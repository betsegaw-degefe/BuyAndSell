import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { AddressModel } from 'src/app/models/address-model';
import { Configuration } from 'src/app/app.constants';

@Injectable()
export class AddressService {

  private actionUrl: string;
  public addresses: AddressModel[] = [];

  constructor(private http: HttpClient, private configuration: Configuration) {
    //constructor(private http: HttpClient) {
    this.actionUrl = configuration.serverWithApiUrl + 'address/';
  }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {

  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }
  // Get all address data
  public get(): Observable<boolean> {
    return this.http.get(this.actionUrl)
      .pipe(map((data: any[]) => {
        this.addresses = data;
        return true;
      }));
    // return this.http.get<AddressModel[]>(this.actionUrl)
    //   .pipe(
    //     tap(heroes => console.log()),
    //     catchError(this.handleError('getAddresses', []))
    //   )
  }
}

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    return next.handle(req);
  }
}