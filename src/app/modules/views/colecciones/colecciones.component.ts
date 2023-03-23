import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { CollectionModel, PaginadorValue } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { NuevaColeccionComponent } from './nueva-coleccion/nueva-coleccion.component';

@Component({
  selector: 'app-colecciones',
  templateUrl: './colecciones.component.html',
})
export class ColeccionesComponent implements OnInit {
  urlApi: string;

  data: CollectionModel[] = [];

  nameSearch: string;

  paginadorValue: PaginadorValue = {
    page: 1,
    rows: 10,
    totalRecords: 0,
  };

  constructor(
    private titleService: Title,
    private _h: HeaderService,
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
    this.getCollections();
  }

  buscar(): void {
    if (this.nameSearch) {
      this.getCollections();
    }
  }

  limpiar() {
    if (this.nameSearch) {
      this.nameSearch = null;
      this.getCollections();
    }
  }

  setPaginadorValue(page: number, rows: number, total: number) {
    this.paginadorValue = new PaginadorValue();
    this.paginadorValue.rows = rows;
    this.paginadorValue.page = page;
    this.paginadorValue.totalRecords = total;
  }

  getCollections() {
    this.data = [];
    var page = this.paginadorValue.page;
    var rows = this.paginadorValue.rows;
    var search = this.nameSearch ? `search=${this.nameSearch}&` : '';
    var query = `?${search}page=${page}&size=${rows}`;
    this.apiService.getAll(Endpoint.collections + query).subscribe((res) => {
      this.setPaginadorValue(page, rows, res.total);
      this.data = res.data;
    });
  }

  newRegister() {
    const ref = this.dialogService.open(NuevaColeccionComponent, {
      header: 'Nueva Colección',
      styleClass: 'modal-drume-sm',
      // width: '60%',
      // showHeader: false,
    });
    ref.onClose.subscribe((response) => {
      if (response) {
        this.getCollections();
      }
    });
  }

  verEdit(item) {}

  confirm(item) {}
}
