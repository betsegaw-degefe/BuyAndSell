import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../app.constants';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductAttributeService {

  private actionUrl: string;

  constructor(private http: HttpClient, private configuration: Configuration) {
    this.actionUrl = configuration.serverWithApiUrl + 'productattribute/';
  }

  /**
  * Get ProductAttribute by id.
  * @param id : ProductAttributeId.
  */
  public getById(id: any): Observable<any> {
    return this.http.get(this.actionUrl + id)
      .pipe(
        tap(),
        catchError(this.handleError('Get ProductAttribute by id', []))
      )
  }


  /**
   * Register product attribute
   * @param model: productAttribute model
   */
  public register(model: any): Observable<any> {
    model.active = true;
    model.unit = "none";
    return this.http.post<any>(this.actionUrl + 'register', model)
      .pipe(
        tap(),
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
