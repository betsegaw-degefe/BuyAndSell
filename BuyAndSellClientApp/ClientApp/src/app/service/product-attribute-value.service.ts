import { Injectable } from '@angular/core';
import { ProductAttributeValueModel } from '../models/product-attribute-value-model';
import { Configuration } from '../app.constants';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductAttributeValueService {
  private actionUrl: string;
  public productAttributeValue: ProductAttributeValueModel[] = [];

  constructor(private http: HttpClient, private configuration: Configuration) {
    this.actionUrl = configuration.serverWithApiUrl + 'productattributevalue/';
  }

  /**
   * Register product attribute value
   * @param model: productAttributeValue model
   */
  public register(model: any): Observable<any> {
    model.active = true;
    return this.http.post<any>(this.actionUrl + 'register', model)
      .pipe(
        tap(_ => this.log('register')),
        catchError(this.handleError('register', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }

}
