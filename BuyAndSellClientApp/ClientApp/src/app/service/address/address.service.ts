import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { AddressModel } from 'src/app/models/address-model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = 'https://localhost:5001/api/address';

@Injectable()
export class AddressService {

  private accessPointUrl: string = 'https://localhost:5001/api/address';
  public addresses = [];

  constructor(private http: HttpClient) {
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  // Get all address data
    public get(): Observable<boolean> {
    return this.http.get(this.accessPointUrl)
      .pipe(map((data: any[]) => {
        this.addresses = data;
        return true;
      }));
    // return this.http.get<AddressModel[]>(this.accessPointUrl)
    //   .pipe(
    //     tap(heroes => console.log()),
    //     catchError(this.handleError('getAddresses', []))
    //   )
  }
}
