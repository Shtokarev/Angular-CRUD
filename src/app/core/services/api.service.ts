import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

import { IProductsHttp } from '@app/core/models';

@Injectable()
export class ApiService {
  productUrl = `https://yandex.ru/`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProductsHttp> {
    return this.http.get<IProductsHttp>(this.productUrl).pipe(
      delay(1000),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = `status:${error.status} OK:${error.ok} text:${
          error.statusText
        }`;
        console.log(errorMessage);
        return throwError(`Server response error: ${errorMessage}`);
      })
    );
  }

  postProducts(payload): Observable<any> {
    return this.http.post(this.productUrl, payload).pipe(
      delay(1000),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = `status:${error.status} OK:${error.ok} text:${
          error.statusText
        }`;
        console.log(errorMessage);
        return throwError(`Server response error: ${errorMessage}`);
      })
    );
  }

  updateProducts(payload): Observable<any> {
    return this.http.put(this.productUrl, payload).pipe(
      delay(1000),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = `status:${error.status} OK:${error.ok} text:${
          error.statusText
        }`;
        console.log(errorMessage);
        return throwError(`Server response error: ${errorMessage}`);
      })
    );
  }

  deleteProducts(payload): Observable<any> {
    const params = new HttpParams().set('id', payload.id + '');
    return this.http.delete(this.productUrl, { params }).pipe(
      delay(1000),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = `status:${error.status} OK:${error.ok} text:${
          error.statusText
        }`;
        console.log(errorMessage);
        return throwError(`Server response error: ${errorMessage}`);
      })
    );
  }
}
