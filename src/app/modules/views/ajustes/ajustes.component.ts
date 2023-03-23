import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { BannerModel, CarouselModel } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { NuevoBannerComponent } from './nuevo-banner/nuevo-banner.component';
import { NuevoCarruselComponent } from './nuevo-carrusel/nuevo-carrusel.component';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
})
export class AjustesComponent implements OnInit {
  listBanners: BannerModel[] = [];
  listCarousel: CarouselModel[] = [];

  searchBanner: string;

  searchCarrousel: string;

  urlApi: string;

  constructor(
    private titleService: Title,
    public _h: HeaderService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private apiService: ApiService
  ) {
    _h.setTitle(route.snapshot.data['title']);
    const title = route.snapshot.data['title']
      ? ' - ' + route.snapshot.data['title']
      : '';
    this.titleService.setTitle('Administrador Drumé ' + title);

    this.urlApi = apiService.urlApi;
  }

  ngOnInit(): void {
    this.getBanners();
    this.getCarrousels();
  }

  getBanners() {
    this.apiService.getAll(Endpoint.banners).subscribe((res) => {
      this.listBanners = res.data;
    });
  }

  buscarBanner() {}

  limpiarBanner() {}

  newBanner() {
    const ref = this.dialogService.open(NuevoBannerComponent, {
      header: 'Nuevo Banner',
      styleClass: 'modal-drume-sm',
      // width: '60%',
      // showHeader: false,
    });
    ref.onClose.subscribe((response) => {
      if (response) {
        this.getBanners();
      }
    });
  }

  editBanner(item) {}

  delBanner(id) {}

  getCarrousels() {
    this.apiService.getAll(Endpoint.carousels).subscribe((res) => {
      this.listCarousel = res.data;
    });
  }

  buscarCarrousel() {}

  limpiarCarrousel() {}

  newCarrousel() {
    const ref = this.dialogService.open(NuevoCarruselComponent, {
      header: 'Nuevo Carrusel',
      styleClass: 'modal-drume-sm',
      // width: '60%',
      // showHeader: false,
    });
    ref.onClose.subscribe((response) => {
      if (response) {
        this.getCarrousels();
      }
    });
  }

  editCarrousel(item) {}

  delCarrousel(id) {}
}
