import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Configuration } from '../app.constants';
import { ProductCategoryModel } from '../models/product-category-model';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private token = localStorage.getItem("token");
  private actionUrl: string;
  public productCategory: ProductCategoryModel[] = [];

  constructor(private http: HttpClient, private configuration: Configuration) {
    this.actionUrl = configuration.serverWithApiUrl + 'category/';
  }

  /**
   * Get all product category.
   */
  public get(): Observable<boolean> {

    return this.http.get(this.actionUrl, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
      })
    })
      .pipe(map((data: any[]) => {
        this.productCategory = data;
        return true;
      }));
  }

  /**
   * Search a product category by category name.
   * @param model 
   */
  public getCategory(categoryName: any): Observable<any> {
    return this.http.post<any>(this.actionUrl + 'searchByName', categoryName, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.token,
      })
    })
      .pipe(
        tap(_ => this.log('searchByName')),
        catchError(this.handleError('searchByName', []))
      );
  }

  /**
   * Register product category 
   * @param model: product category model
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