import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Configuration } from '../app.constants';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private actionUrl: string;

  constructor(private http: HttpClient, private configuration: Configuration) {
    this.actionUrl = configuration.serverWithApiUrl + 'offer/';
  }

  /**
   * get offer by using user id.
   * @param model: user id.
   */
  public getMyOffer(model: any): Observable<any> {
    return this.http.post<any>(this.actionUrl + 'myoffers', model)
      .pipe(
        tap(),
        catchError(this.handleError('Get Offer: ', []))
      );
  }

  /**
   * Register Offer
   * @param model: Offer Model
   */
  public register(model: any): Observable<any> {
    return this.http.post<any>(this.actionUrl + 'register', model)
      .pipe(
        tap(),
        catchError(this.handleError('Offer Register', []))
      );
  }

  /**
   * Delete offer
   * @param model offer to delete.
   */
  public deleteOffer(model: any): Observable<any> {
    return this.http.put<any>(this.actionUrl + 'deleteoffer', model)
      .pipe(
        tap(),
        catchError(this.handleError('Offer Deleted', []))
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