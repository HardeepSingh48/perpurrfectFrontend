import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) { }

  signup(name: string, username: string, password: string): Observable<any> {
    const user = { name, username, password };
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  signin(username: string, password: string): Observable<any> {
    const user = { username, password };
    return this.http.post(`${this.apiUrl}/signin`, user);
  }

  isTokenExpired(token: string): boolean {
    if (!token) {
      return true; // Token not available, consider expired
    }
    
    const decoded: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    console.log(decoded); 
    
    
    // If the token expiration time (exp) is less than the current time, it's expired
    return decoded.exp < currentTime;
  }
  
  // Optional: You can also add a function to get the token from local storage
  getToken(): string | null {
    return localStorage.getItem('jwtToken');  // Example storage mechanism
  }
}
