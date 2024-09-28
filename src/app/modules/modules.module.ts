import { NgModule } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { ModulesRoutingModule } from './modules-routing.module';
import { LoadingComponent } from './components/loading/loading.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ModulesComponent } from './modules.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { Title } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { DashCardComponent } from './components/dash-card/dash-card.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { PendientesComponent } from './views/pedidos/pendientes/pendientes.component';
import { ConfirmadosComponent } from './views/pedidos/confirmados/confirmados.component';
import { EnviadosComponent } from './views/pedidos/enviados/enviados.component';
import { VentasComponent } from './views/pedidos/ventas/ventas.component';
import { ProductosComponent } from './views/productos/productos.component';
import { ColeccionesComponent } from './views/colecciones/colecciones.component';
import { OfertasComponent } from './views/ofertas/ofertas.component';
import { AjustesComponent } from './views/ajustes/ajustes.component';
import { NuevoProductoComponent } from './views/productos/nuevo-producto/nuevo-producto.component';
import { NuevaColeccionComponent } from './views/colecciones/nueva-coleccion/nueva-coleccion.component';
import { NuevoBannerComponent } from './views/ajustes/banners/nuevo-banner/nuevo-banner.component';
import { NuevoCarruselComponent } from './views/ajustes/carousels/nuevo-carrusel/nuevo-carrusel.component';
import { NuevaOfertaComponent } from './views/ofertas/nueva-oferta/nueva-oferta.component';
import { CarouselsComponent } from './views/ajustes/carousels/carousels.component';
import { BannersComponent } from './views/ajustes/banners/banners.component';
import { ColorsComponent } from './views/ajustes/colors/colors.component';
import { SizesComponent } from './views/ajustes/sizes/sizes.component';
import { NuevoColorComponent } from './views/ajustes/colors/nuevo-color/nuevo-color.component';
import { NuevaTallaComponent } from './views/ajustes/sizes/nueva-talla/nueva-talla.component';
import { GestionarStockComponent } from './views/productos/gestionar-stock/gestionar-stock.component';
import { EmpresaComponent } from './views/ajustes/empresa/empresa.component';
import { CanceladosComponent } from './views/pedidos/cancelados/cancelados.component';
import { ConfirmarPedidoComponent } from './views/pedidos/componentes/confirmar-pedido/confirmar-pedido.component';
import { VincularOfertaComponent } from './views/ofertas/vincular-oferta/vincular-oferta.component';
import { DetallePedidoComponent } from './views/pedidos/componentes/detalle-pedido/detalle-pedido.component';
import { MultimediaComponent } from './views/ajustes/multimedia/multimedia.component';
import { ComprobanteComponent } from './views/pedidos/componentes/comprobante/comprobante.component';
import { ParametersComponent } from './views/ajustes/parameters/parameters.component';
import { NuevoParametroComponent } from './views/ajustes/parameters/nuevo-parametro/nuevo-parametro.component';
import { categoriasComponent } from './views/categorias/categorias.component';
import { NuevaCategoriaComponent } from './views/categorias/nueva-categoria/nueva-categoria.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ModulesComponent,
    NotFoundComponent,
    DashboardComponent,
    PendientesComponent,
    ConfirmadosComponent,
    EnviadosComponent,
    VentasComponent,
    CanceladosComponent,
    ProductosComponent,
    categoriasComponent,
    ColeccionesComponent,
    OfertasComponent,
    AjustesComponent,
    DashCardComponent,
    PaginatorComponent,
    NuevoProductoComponent,
    NuevaCategoriaComponent,
    NuevaColeccionComponent,
    NuevoBannerComponent,
    NuevoCarruselComponent,
    NuevaOfertaComponent,
    CarouselsComponent,
    BannersComponent,
    ColorsComponent,
    SizesComponent,
    NuevoColorComponent,
    NuevaTallaComponent,
    GestionarStockComponent,
    EmpresaComponent,
    ConfirmarPedidoComponent,
    VincularOfertaComponent,
    DetallePedidoComponent,
    MultimediaComponent,
    ComprobanteComponent,
    LoadingComponent,
    ParametersComponent,
    NuevoParametroComponent,
  ],
  imports: [CoreModule, ModulesRoutingModule, AngularSvgIconModule.forRoot()],
  exports: [LoadingComponent],
  providers: [Title, DatePipe],
})
export class ModulesModule {}
