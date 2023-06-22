import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import {
  CreateProductDTO,
  Producto,
  UpdateProductDTO,
} from '../components/models/producto.model';
import { catchError, map, retry, throwError, zip } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.API_URL}api/products`;

  constructor(private http: HttpClient) {}

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Producto[]>(this.apiUrl, { params }).pipe(
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
  getProduct(id: string) {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`).pipe(
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
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', limit);
    }
    return this.http.get<Producto[]>(this.apiUrl, { params }).pipe(
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
    return this.http.post<Producto>(this.apiUrl, dto);
  }
  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, dto);
  }
  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
