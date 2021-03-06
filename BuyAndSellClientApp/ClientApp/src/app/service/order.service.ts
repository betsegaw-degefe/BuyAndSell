import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Configuration } from '../app.constants';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private actionUrl: string;
  private token = localStorage.getItem("token");

  constructor(private http: HttpClient, private configuration: Configuration) {
    this.actionUrl = configuration.serverWithApiUrl + 'order/';
  }


  /**
   * get order by id.
   * @param id: order id.
   */
  public get(id: number): Observable<any> {
    return this.http.get<any>(this.actionUrl + id, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
      })
    })
    // .pipe(
    //   tap(),
    //   catchError(this.handleError('Get Order by id : ', []))
    // );
  }
  /**
   * get order by using user id.
   * @param model: user id.
   */
  public getMyOrder(model: any): Observable<any> {
    return this.http.post<any>(this.actionUrl + 'myorder', model, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
      })
    })
      .pipe(
        tap(),
        catchError(this.handleError('Get Order: ', []))
      );
  }

  /**
   * get order by using seller id.
   * @param model: user/seller id.
   */
  public getMyProductOrder(model: any): Observable<any> {
    return this.http.post<any>(this.actionUrl + 'myproductorder', model, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
      })
    })
  }


  /**
   * get order by using product id.
   * @param model: user id.
   */
  public getByProductId(productId: any): Observable<any> {
    let SearchByProductId: any = {}
    SearchByProductId.ProductId = productId;
    return this.http.post<any>(this.actionUrl + 'byproductid', SearchByProductId, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
      })
    })
    // .pipe(
    //   tap(),
    //   catchError(this.handleError('Get Order: ', []))
    // );
  }

  /**
   * Register Order
   * @param model: OrderModel
   */
  public register(model: any): Observable<any> {
    return this.http.post<any>(this.actionUrl + 'register', model, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
      })
    })
      .pipe(
        tap(),
        catchError(this.handleError('Order Register', []))
      );
  }

  /**
   * Delete order
   * @param model order to delete.
   */
  public deleteOrder(model: any): Observable<any> {
    return this.http.put<any>(this.actionUrl + 'deleteorder', model,
      {
        headers: new HttpHeaders({
          "Authorization": "Bearer " + this.token,
        })
      })
      .pipe(
        tap(),
        catchError(this.handleError('Order Deleted', []))
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