import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { IProduct } from '@app/core/models';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

let localServerStorage = [
  {
    id: 0,
    name: 'IPhone 6',
    description: 'Apple amazing smartphone',
    price: 100,
    qty: 10
  } as IProduct,
  {
    id: 1,
    name: 'Samsung Galaxy S8',
    description: 'Samsung smartphone',
    price: 100,
    qty: 100
  } as IProduct
];

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.method === 'GET') {
      return of(
        new HttpResponse({
          status: 200,
          body: {
            products: [...localServerStorage]
          }
        })
      );
    }

    if (request.method === 'POST') {
      const newProduct: IProduct = { ...request.body };
      newProduct.id =
        localServerStorage.reduce((prev: number, current: IProduct) => {
          if (current.id > prev) {
            return current.id;
          }
          return prev;
        }, 0) + 1;

      localServerStorage.push(newProduct);

      return of(
        new HttpResponse({
          status: 200
        })
      );
    }

    if (request.method === 'PUT') {
      const foundIndex = localServerStorage.findIndex(
        item => item.id === request.body.id
      );

      if (foundIndex === -1) {
        return throwError(
          new HttpErrorResponse({ status: 404, statusText: 'Not found' })
        );
      }

      localServerStorage[foundIndex] = { ...request.body };

      return of(
        new HttpResponse({
          status: 200,
          body: {
            product: localServerStorage[foundIndex]
          }
        })
      );
    }

    if (request.method === 'DELETE') {
      const requestId = +request.params.get('id');

      const foundIndex = localServerStorage.findIndex(
        item => item.id === requestId
      );

      if (foundIndex === -1) {
        return throwError(
          new HttpErrorResponse({ status: 404, statusText: 'Not found' })
        );
      }

      localServerStorage = localServerStorage.filter(
        (item, index) => index !== foundIndex
      );

      return of(
        new HttpResponse({
          status: 200
        })
      );
    }

    return next.handle(request);
  }
}
