import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constant/constant';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from '../../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) { }

  getCategory() {
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_CATEGORY);
  }
  // getProducts(): Observable<any[]> {
  //   const token = this.getToken();
  //   // console.log(token);
  //   const headers = new HttpHeaders().set('x-auth-token', token || '');
  //   // console.log(headers);

  //   console.log('Headers being sent:', headers);

  //   return this.http.get<any[]>(`${this.apiUrl}`, { headers });
  // }

  getProducts(): Observable<any[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('x-auth-token', token || '');
    // console.log('Headers being sent:', headers); // Log headers for debugging

    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  getProductsById(id:string): Observable<Product> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('x-auth-token', token || '');
    // console.log('Headers being sent:', headers);

    return this.http.get<Product>(`${this.apiUrl}/product/${id}`,{ headers });
  }



  saveProduct(product: any, options?: { headers: HttpHeaders }) {
    return this.http.post(this.apiUrl, product, options);
  }



  updateProduct(id: string, product: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-auth-token', token || '');
    // console.log(headers);
    return this.http.put(`${this.apiUrl}/${id}`, product, { headers });
  }

  deleteProduct(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError('Token not found in localStorage');
    }

    const headers = new HttpHeaders().set('x-auth-token', token);

    const options = {
      headers: headers
    };

    return this.http.delete(`${this.apiUrl}/${id}`, options).pipe(
      catchError(error => {
        console.error('Error deleting product', error);
        throw error;
      })
    );
  }

  //original

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  // getToken(): string | null {
  //   const token = localStorage.getItem('token');
  //   console.log('Token retrieved:', token); // Log the retrieved token
  //   return token;
  // }
}
