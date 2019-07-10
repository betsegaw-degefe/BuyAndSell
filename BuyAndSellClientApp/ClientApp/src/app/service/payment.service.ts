import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Configuration } from '../app.constants';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private actionUrl: string;
  private token = localStorage.getItem("token");

  constructor(private http: HttpClient, private configuration: Configuration) {
    this.actionUrl = configuration.serverWithApiUrl + 'paymentservice/';
  }

  /**
   * Get payment service by pincode.
   * @param pincode : pincode of the account to search.
   */
  public GetByPinCode(model: any) {
    return this.http.post<any>(this.actionUrl + 'paymentpincode', model, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
      })
    })
    // .pipe(
    //   tap(),
    //   catchError(this.handleError('Get By Pincode: ', []))
    // );
  }

  /**
  * Pay for the order
  * @param model Payment address to pay.
  */
  public PayPayment(model: any): Observable<any> {
    return this.http.put<any>(this.actionUrl + 'payment', model)
    // .pipe(
    //   tap(),
    //   catchError(this.handleError('Payment Paid', []))
    // );
  }

  /**
   * Add the product price to the seller account balance.
   * @param model : updated payment service.
   */
  public AddBalace(model: any): Observable<any> {
    return this.http.put<any>(this.actionUrl + 'addbalance', model)
      .pipe(
        tap(),
        catchError(this.handleError('Add Balance', []))
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