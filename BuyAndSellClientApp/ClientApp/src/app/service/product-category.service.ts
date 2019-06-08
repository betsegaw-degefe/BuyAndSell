import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Configuration } from '../app.constants';
import { ProductCategoryModel } from '../models/product-category-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private actionUrl: string;
  public productCategory: ProductCategoryModel[] = [];

  constructor(private http: HttpClient, private configuration: Configuration) {
    this.actionUrl = configuration.serverWithApiUrl + 'category/';
  }

  public get(): Observable<boolean> {
    return this.http.get(this.actionUrl)
      .pipe(map((data: any[]) => {
        this.productCategory = data;
        return true;
      }));
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