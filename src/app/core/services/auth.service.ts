import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string = '';

  urlApi: string = `${environment.protocol}://${environment.host}:${environment.port}/`;

  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }

  login(user: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(`${this.urlApi}auth/login`, user, options);
  }

  public setCurrentUser(user: any) {
    this.token = user.token;
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/']);
  }

  currentUser() {
    return localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null;
  }

  getToken() {
    this.token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).token
      : null;
    return this.token;
  }

  isAuth(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);

      if (helper.isTokenExpired(token)) {
        localStorage.removeItem('user');
        return false;
      }

      if (!decodedToken) {
        localStorage.removeItem('user');
        return false;
      }
    } catch (error) {
      localStorage.removeItem('user');
      return false;
    }
    return true;
  }
}
