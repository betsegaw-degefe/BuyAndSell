import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Configuration } from '../app.constants';
import { ProductModel } from '../models/product-model';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private actionUrl: string;
  public product: ProductModel[] = [];
  private token = localStorage.getItem("token");

  constructor(private http: HttpClient, private configuration: Configuration) {
    this.actionUrl = configuration.serverWithApiUrl + 'product/';
  }

  /**
   * Register product 
   * @param model: product model
   */
  public register(model: any): Observable<any> {
    model.active = true;
    return this.http.post<any>(this.actionUrl + 'register', model, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
      })
    })
      .pipe(
        tap(_ => this.log('register')),
        catchError(this.handleError('register', []))
      );
  }

  /**
   * Get product by product id.
   * @param id : product id.
   */
  public getById(id: any): Observable<any> {
    return this.http.get(this.actionUrl + id)
      .pipe(
        tap(),
        catchError(this.handleError('Get product by id', []))
      )
  }


  /**
   * Get all products
   */
  public get(): Observable<boolean> {
    return this.http.get(this.actionUrl)
      .pipe(map((data: any[]) => {
        //this.productCategory = data;
        this.product = data
        return true;
      }));
  }

  /**
   * get products by user id.
   * @param model: user id.
   */
  public getMyProducts(model: any): Observable<any> {
    return this.http.post<any>(this.actionUrl + 'myproducts', model)
      .pipe(
        tap(),
        catchError(this.handleError('Get My Products: ', []))
      );
  }

  /**
   * Search product by search key and category.
   * @param model: Search product model
   */
  public SearchProductByKey(model: any): Observable<any> {

    return this.http.post<any>(this.actionUrl + 'searchproductbykey', model)
      .pipe(
        tap(),
        catchError(this.handleError('SearchProduct: ', []))
      );
  }

  /**
   * Update product
   * @param model product to update.
   */
  public updateProduct(model: any): Observable<any> {
    return this.http.put<any>(this.actionUrl + 'updateproduct', model)
      .pipe(
        tap(),
        catchError(this.handleError('Product Deleted', []))
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
