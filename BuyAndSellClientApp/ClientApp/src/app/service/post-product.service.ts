import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../app.constants';
import { ProductAttributeModel } from '../models/product-attribute-model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostProductService {

  private actionUrl: string;
  public productAttribute: ProductAttributeModel[] = [];

  constructor(private http: HttpClient, private configuration: Configuration) {
    this.actionUrl = configuration.serverWithApiUrl + 'productattribute/';
  }

  /**
   * Search a product attribute by id.
   * @param id : product attribute id.
   */
  public get(id) {
    return this.http.get(this.actionUrl + id);
  }

  /**
   * Search a product attribute by category id.
   * @param categoryId : product attribute category id 
   */
  public getProductAttribute(categoryId: number): Observable<any> {
    return this.http.get(this.actionUrl + "searchByCategoryId/" + categoryId)
      .pipe(map((data: any[]) => {
        this.productAttribute = data;
        return this.productAttribute;
      }));
  }
}
