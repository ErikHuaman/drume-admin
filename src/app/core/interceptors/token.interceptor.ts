import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, finalize, map, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageGlobalService } from '../services/message-global.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private msg: MessageGlobalService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.authService.getToken();

        const url = environment.apiUrl;

        // Clona la solicitud y agrega el token en el encabezado Authorization.
        if (token && req.url.includes(url)) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
              this.msg.loading(true);
              return event;
            }),
            catchError(err => {
              return throwError(err);
            }),
            finalize(() => {
                this.msg.loading(false);
            })
          );
    }
}

export const TokenInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
}