import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

import { IProductsHttp } from '@app/core/models';

@Injectable()
export class ApiService {
  productUrl = `testurl`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProductsHttp> {
    return this.http.get<IProductsHttp>(this.productUrl).pipe(
      delay(1000),
      catchError((error: any) => Observable.throw(error))
    );
  }

  postProducts(payload): Observable<any> {
    return this.http.post(this.productUrl, payload).pipe(
      delay(1000),
      catchError((error: any) => Observable.throw(error))
    );
  }

  updateProducts(payload): Observable<any> {
    return this.http.put(this.productUrl, payload).pipe(
      delay(1000),
      catchError((error: any) => Observable.throw(error))
    );
  }

  deleteProducts(payload): Observable<any> {
    const params = new HttpParams().set('id', payload.id + '');
    return this.http.delete(this.productUrl, { params }).pipe(
      delay(1000),
      catchError((error: any) => Observable.throw(error))
    );
  }
}
