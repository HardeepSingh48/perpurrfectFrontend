import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:5000/api';
  http = inject(HttpClient);
  items: { product: Product, quantity: number }[] = [];

  constructor() { }

  init() {
    return this.getCartItems().subscribe(result => {
      this.items = result;
    });
  }

  getCartItems() {
    const headers = this.createHeaders(); // Get headers with token
    return this.http.get<{ product: Product, quantity: number }[]>(`${this.apiUrl}/customer/carts`, { headers });
  }

  addToCart(productId: string, quantity: number) {
    const headers = this.createHeaders(); // Get headers with token
    return this.http.post(`${this.apiUrl}/customer/carts/${productId}`, { quantity }, { headers });
  }

  removeFromCart(productId: string) {
    const headers = this.createHeaders(); // Get headers with token
    return this.http.delete(`${this.apiUrl}/customer/carts/${productId}`, { headers });
  }

  private createHeaders() {
    const token = localStorage.getItem('token'); // Adjust if using a different storage method
    return new HttpHeaders({
      'x-auth-token': token ? token : '', // Send the token in the header
    });
  }
}
