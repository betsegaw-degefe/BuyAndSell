import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Configuration } from '../app.constants';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private actionUrl: string;
  public SearchByProductId: any = {};
  private token = localStorage.getItem("token");

  constructor(private http: HttpClient, private configuration: Configuration) {
    this.actionUrl = configuration.serverWithApiUrl + 'offer/';
  }

  /**
   * get an offer by id.
   * @param id : offer id.
   */
  public get(id) {
    return this.http.get(this.actionUrl + id, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
      })
    })
      .pipe(
        tap(),
        catchError(this.handleError('Get Offer by id: ', []))
      );
  }

  /**
   * get offer by using user id.
   * @param model: user id.
   */
  public getMyOffer(model: any): Observable<any> {
    return this.http.post<any>(this.actionUrl + 'myoffers', model, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
      })
    })
      .pipe(
        tap(),
        catchError(this.handleError('Get Offer: ', []))
      );
  }

  /**
   * 
   * @param ProductId : productid of the offer
   */
  public getByProductId(ProductId: any): Observable<any> {
    this.SearchByProductId.ProductId = ProductId;
    return this.http.post<any>(this.actionUrl + 'searchbyproductid', this.SearchByProductId, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
      })
    })
      .pipe(
        tap(),
        catchError(this.handleError('searchbyproductid', []))
      );
  }

  /**
   * Register Offer
   * @param model: Offer Model
   */
  public register(model: any): Observable<any> {
    return this.http.post<any>(this.actionUrl + 'register', model, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
      })
    })
      .pipe(
        tap(),
        catchError(this.handleError('Offer Register', []))
      );
  }

  /**
   * Update offer
   * @param model offer to update.
   */
  public updateOffer(model: any): Observable<any> {
    return this.http.put<any>(this.actionUrl + 'updateoffer', model, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
      })
    })
      .pipe(
        tap(),
        catchError(this.handleError('Offer Updated', []))
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
