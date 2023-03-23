import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { ModulesComponent } from './modules.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AjustesComponent } from './views/ajustes/ajustes.component';
import { ColeccionesComponent } from './views/colecciones/colecciones.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { EnviadosComponent } from './views/enviados/enviados.component';
import { OfertasComponent } from './views/ofertas/ofertas.component';
import { PedidosComponent } from './views/pedidos/pedidos.component';
import { PendientesComponent } from './views/pendientes/pendientes.component';
import { ProductosComponent } from './views/productos/productos.component';
import { VentasComponent } from './views/ventas/ventas.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ModulesComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
        },
      },
      {
        path: 'pendientes',
        component: PendientesComponent,
        data: {
          title: 'Pendientes',
        },
      },
      {
        path: 'pedidos',
        component: PedidosComponent,
        data: {
          title: 'Pedidos',
        },
      },
      {
        path: 'enviados',
        component: EnviadosComponent,
        data: {
          title: 'Enviados',
        },
      },
      {
        path: 'ventas',
        component: VentasComponent,
        data: {
          title: 'Ventas',
        },
      },
      {
        path: 'productos',
        component: ProductosComponent,
        data: {
          title: 'Productos',
        },
      },
      {
        path: 'colecciones',
        component: ColeccionesComponent,
        data: {
          title: 'Colecciones',
        },
      },
      {
        path: 'ofertas',
        component: OfertasComponent,
        data: {
          title: 'Ofertas',
        },
      },
      {
        path: 'ajustes',
        component: AjustesComponent,
        data: {
          title: 'Ajustes',
        },
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule {}
