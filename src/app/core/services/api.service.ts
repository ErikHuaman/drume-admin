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
  public urlApi = `${environment.protocol}://${environment.host}:${environment.port}/`;

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
    return this.http.get(`${this.urlApi}adm/${endpoint}`, options);
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

    console.log('dataSave', dataSave);

    return this.http.post(`${this.urlApi}adm/${endpoint}`, dataSave, options);
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
    return this.http.get(`${this.urlApi}routes`);
  }
}
