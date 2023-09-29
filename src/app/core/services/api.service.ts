import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { STORAGE } from '../constants/constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  public getAll(endpoint: string): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };
    return this.http.get(`${this.apiUrl}adm/${endpoint}`, options);
  }

  public save(
    data: any,
    endpoint: string,
    isFile: boolean = false
  ): Observable<any> {
    let dataSave: any;
    let options;

    if (!isFile) {
      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          authorization: `Bearer ${this.authService.getToken()}`,
        }),
      };

      dataSave = data;
    } else {
      options = {
        headers: new HttpHeaders({
          Accept: 'application/json',
          authorization: `Bearer ${this.authService.getToken()}`,
        }),
      };

      dataSave = this.convertToFormData(data);
    }

    return this.http.post(`${this.apiUrl}adm/${endpoint}`, dataSave, options);
  }

  public edit(
    data: any,
    endpoint: string,
    isFile: boolean = false
  ): Observable<any> {
    let dataSave: any;
    let options;

    if (!isFile) {
      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          authorization: `Bearer ${this.authService.getToken()}`,
        }),
      };

      dataSave = data;
    } else {
      options = {
        headers: new HttpHeaders({
          Accept: 'application/json',
          authorization: `Bearer ${this.authService.getToken()}`,
        }),
      };

      dataSave = this.convertToFormData(data);
    }

    return this.http.put(`${this.apiUrl}adm/${endpoint}`, dataSave, options);
  }

  public changeStatus(id: number, endpoint: string): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };

    return this.http.get(
      `${this.apiUrl}adm/${endpoint}/change-status/${id}`,
      options
    );
  }

  public orderStatus(data: any): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };

    return this.http.post(
      `${this.apiUrl}adm/orders/order-status`,
      data,
      options
    );
  }

  public decline(id: number): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };

    return this.http.delete(`${this.apiUrl}adm/orders/decline/${id}`, options);
  }

  public delete(id: number, endpoint: string): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };

    return this.http.delete(`${this.apiUrl}adm/${endpoint}/${id}`, options);
  }

  public stock(data: any): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };

    return this.http.patch(`${this.apiUrl}adm/products/stock`, data, options);
  }

  public discount(data: any): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };

    return this.http.patch(
      `${this.apiUrl}adm/products/discount`,
      data,
      options
    );
  }

  private convertToFormData(item: any) {
    const formData = new FormData();
    for (let key in item) {
      if (key == 'gallery') {
        for (let k in item[key]) {
          formData.append(key, item[key][k]);
        }
      } else if (item[key]) {
        formData.append(key, item[key]);
      }
    }

    return formData;
  }

  public getRoutes(): Observable<any> {
    return this.http.get(`${this.apiUrl}routes`);
  }

  public getInformation(): Observable<any> {
    return this.http.get(`${this.apiUrl}information`);
  }

  public updateInformation(data): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };

    return this.http.patch(`${this.apiUrl}adm/information`, data, options);
  }

  public getComprobante(hash: string): Observable<Blob> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/pdf' });

    return this.http.get(`${this.apiUrl}public/order-slip/${hash}`, {
      responseType: 'blob',
    });
  }
}
