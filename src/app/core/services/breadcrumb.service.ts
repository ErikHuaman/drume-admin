import { Injectable } from '@angular/core';
import { Breadcrumb } from '../models/breadcrumb.model';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  _breadcrumb: Breadcrumb[] = [];

  constructor() {}

  get bc(): Breadcrumb[] {
    return this._breadcrumb.map((item) => {
      if (item.label == 'Login') {
        item.label = 'Iniciar Sesión';
      } else if (item.label == 'Register') {
        item.label = 'Registrarse';
      } else if (item.label == 'Forgot Password') {
        item.label = 'Has olvidado tu contraseña';
      } else if (item.label == 'Verify Email') {
        item.label = 'Verificar correo electronico';
      }
      return item;
    });
  }

  set bc(value: Breadcrumb[]) {
    value.map((item, index) => {
      if (value.length === index + 1) {
        item.label = item.label.split('?')[0];
      }
    });
    this._breadcrumb = value;
  }

  setRuta(ruta: string) {
    const breadcrumb: Breadcrumb[] = [];
    const desglose = ruta.split('/');
    desglose.forEach((element, index) => {
      const model: Breadcrumb = new Breadcrumb();
      if (index == desglose.length - 1 && element.split(';')[1]) {
        model.label = element
          .split(';')[0]
          .split('-')
          .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
          .join(' ');
        model.routerLink = '';
        for (let i = 1; i < index; i++) {
          model.routerLink += '/' + desglose[i];
        }
        breadcrumb.push(model);
      } else {
        if (element != '') {
          if (element != 'products') {
            model.label = element
              .split('-')
              .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
              .join(' ');
            model.routerLink = '';
            for (let i = 1; i <= index; i++) {
              model.routerLink += '/' + desglose[i];
            }
            breadcrumb.push(model);
          }
        }
      }
    });
    this.bc = breadcrumb;
  }
}
