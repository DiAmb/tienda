import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';

import { catchError, map, retry, throwError, zip } from 'rxjs';
import { environment } from 'src/environments/environment';
import { checkTime } from '../interceptors/time.interceptor';
import {
  CreateProductDTO,
  Producto,
  UpdateProductDTO,
} from '../website/components/models/producto.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.API_URL}/api`;

  constructor(private http: HttpClient) {}

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http
      .get<Producto[]>(`${this.apiUrl}/products`, { params })
      .pipe(
        retry(3),
        map((products) => {
          products.map((item) => {
            return {
              ...item,
              taxes: 0.12 * item.price,
            };
          });
        })
      );
  }
  getByCategory(categoryId: string, limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Producto[]>(
      `${this.apiUrl}/categories/${categoryId}/products`,
      { params }
    );
  }
  getProduct(id: string) {
    return this.http.get<Producto>(`${this.apiUrl}/products/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Upsi algo malo sucedió en el server');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('Sin autorización');
        }
        return throwError('Upsi algo malo sucedió');
      })
    );
  }
  getProductsByPage(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit != undefined && offset != undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http
      .get<Producto[]>(`${this.apiUrl}/products`, {
        params,
        context: checkTime(),
      })
      .pipe(
        retry(3),
        map((products) => {
          return products.map((item) => {
            return {
              ...item,
              taxes: 0.12 * item.price,
            };
          });
        })
      );
  }
  fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
    return zip(this.getProduct(id), this.update(id, dto));
  }
  create(dto: CreateProductDTO) {
    console.log(this.http.post<Producto>(this.apiUrl, dto));
    return this.http.post<Producto>(`${this.apiUrl}/products`, dto);
  }
  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Producto>(`${this.apiUrl}/products/${id}`, dto);
  }
  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }
}
