import { NgModule } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { ModulesRoutingModule } from './modules-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ModulesComponent } from './modules.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { Title } from '@angular/platform-browser';
import { CoreModule } from '../core/core.module';
import { DashCardComponent } from './components/dash-card/dash-card.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { PendientesComponent } from './views/pendientes/pendientes.component';
import { PedidosComponent } from './views/pedidos/pedidos.component';
import { EnviadosComponent } from './views/enviados/enviados.component';
import { VentasComponent } from './views/ventas/ventas.component';
import { ProductosComponent } from './views/productos/productos.component';
import { ColeccionesComponent } from './views/colecciones/colecciones.component';
import { OfertasComponent } from './views/ofertas/ofertas.component';
import { AjustesComponent } from './views/ajustes/ajustes.component';
import { NuevoProductoComponent } from './views/productos/nuevo-producto/nuevo-producto.component';
import { NuevaColeccionComponent } from './views/colecciones/nueva-coleccion/nueva-coleccion.component';
import { NuevoBannerComponent } from './views/ajustes/nuevo-banner/nuevo-banner.component';
import { NuevoCarruselComponent } from './views/ajustes/nuevo-carrusel/nuevo-carrusel.component';
import { NuevaOfertaComponent } from './views/ofertas/nueva-oferta/nueva-oferta.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ModulesComponent,
    NotFoundComponent,
    DashboardComponent,
    PendientesComponent,
    PedidosComponent,
    EnviadosComponent,
    VentasComponent,
    ProductosComponent,
    ColeccionesComponent,
    OfertasComponent,
    AjustesComponent,
    DashCardComponent,
    PaginatorComponent,
    NuevoProductoComponent,
    NuevaColeccionComponent,
    NuevoBannerComponent,
    NuevoCarruselComponent,
    NuevaOfertaComponent,
  ],
  imports: [CoreModule, ModulesRoutingModule, AngularSvgIconModule.forRoot()],
  providers: [Title],
})
export class ModulesModule {}
