import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Configuration } from '../app.constants';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private actionUrl: string;
  private token = localStorage.getItem("token");

  constructor(private http: HttpClient, private configuration: Configuration) {
    this.actionUrl = configuration.serverWithApiUrl + 'cart/';
  }

  /**
   * get cart by user id.
   * @param model: user id.
   */
  public getMyCart(model: any): Observable<any> {
    return this.http.post<any>(this.actionUrl + 'mycarts', model, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
      })
    })
      .pipe(
        tap(),
        catchError(this.handleError('Get Cart: ', []))
      )
  }
  /**
   * Register Cart
   * @param model: Cart Model
   */
  public register(model: any): Observable<any> {
    return this.http.post<any>(this.actionUrl + 'register', model, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
      })
    })
      .pipe(
        tap(),
        catchError(this.handleError('Cart Register', []))
      );
  }

  /**
  * Delete cart
  * @param model cart to delete.
  */
  public deleteCart(model: any): Observable<any> {
    return this.http.put<any>(this.actionUrl + 'deletecart', model, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
      })
    })
      .pipe(
        tap(),
        catchError(this.handleError('Cart Deleted', []))
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