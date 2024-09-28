import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { ModulesComponent } from './modules.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AjustesComponent } from './views/ajustes/ajustes.component';
import { ColeccionesComponent } from './views/colecciones/colecciones.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { EnviadosComponent } from './views/pedidos/enviados/enviados.component';
import { OfertasComponent } from './views/ofertas/ofertas.component';
import { ConfirmadosComponent } from './views/pedidos/confirmados/confirmados.component';
import { PendientesComponent } from './views/pedidos/pendientes/pendientes.component';
import { ProductosComponent } from './views/productos/productos.component';
import { VentasComponent } from './views/pedidos/ventas/ventas.component';
import { BannersComponent } from './views/ajustes/banners/banners.component';
import { CarouselsComponent } from './views/ajustes/carousels/carousels.component';
import { ColorsComponent } from './views/ajustes/colors/colors.component';
import { EmpresaComponent } from './views/ajustes/empresa/empresa.component';
import { CanceladosComponent } from './views/pedidos/cancelados/cancelados.component';
import { MultimediaComponent } from './views/ajustes/multimedia/multimedia.component';
import { ParametersComponent } from './views/ajustes/parameters/parameters.component';
import { categoriasComponent } from './views/categorias/categorias.component';
import { PermissionGuard } from '../core/guards/permission.guard';

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
          title: 'Pedidos Pendientes',
        },
      },
      {
        path: 'pedidos',
        redirectTo: 'pedidos/confirmados',
        pathMatch: 'full',
      },
      {
        path: 'pedidos/confirmados',
        component: ConfirmadosComponent,
        data: {
          title: 'Pedidos Confirmados',
        },
      },
      {
        path: 'pedidos/listos',
        component: EnviadosComponent,
        data: {
          title: 'Pedidos Listos',
        },
      },
      {
        path: 'pedidos/completados',
        component: VentasComponent,
        data: {
          title: 'Ventas Completadas',
        },
      },
      {
        path: 'pedidos/cancelados',
        component: CanceladosComponent,
        data: {
          title: 'Pedidos Cancelados',
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
        path: 'categorias',
        canActivate: [PermissionGuard],
        component: categoriasComponent,
        data: {
          title: 'Categorias',
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
        path: 'descuentos',
        component: OfertasComponent,
        data: {
          title: 'Descuentos',
        },
      },
      {
        path: 'ajustes',
        redirectTo: 'ajustes/empresa',
        pathMatch: 'full',
      },
      {
        path: 'ajustes/empresa',
        component: EmpresaComponent,
        data: {
          title: 'Ajustes - Empresa',
        },
      },
      {
        path: 'ajustes/banners',
        component: BannersComponent,
        data: {
          title: 'Ajustes - Banners',
        },
      },
      {
        path: 'ajustes/carousels',
        component: CarouselsComponent,
        data: {
          title: 'Ajustes - Carruseles',
        },
      },
      {
        path: 'ajustes/colores',
        component: ColorsComponent,
        data: {
          title: 'Ajustes - Colores',
        },
      },
      {
        path: 'ajustes/upload',
        component: MultimediaComponent,
        data: {
          title: 'Biblioteca de medios',
        },
      },
      {
        path: 'ajustes/parametros',
        component: ParametersComponent,
        data: {
          title: 'Parametros',
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
