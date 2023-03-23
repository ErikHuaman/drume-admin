import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { PaginadorValue, ProductModel } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
})
export class ProductosComponent implements OnInit {
  urlApi: string;
  data: ProductModel[] = [];

  nameSearch: string;

  paginadorValue: PaginadorValue = {
    page: 1,
    rows: 10,
    totalRecords: 0,
  };

  constructor(
    private titleService: Title,
    public _h: HeaderService,
    private route: ActivatedRoute,
    public dialogService: DialogService,
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
    this.getProducts();
  }

  buscar(): void {
    if (this.nameSearch) {
      this.getProducts();
    }
  }

  limpiar() {
    if (this.nameSearch) {
      this.nameSearch = null;
      this.getProducts();
    }
  }

  setPaginadorValue(page: number, rows: number, total: number) {
    this.paginadorValue = new PaginadorValue();
    this.paginadorValue.rows = rows;
    this.paginadorValue.page = page;
    this.paginadorValue.totalRecords = total;
  }

  getProducts() {
    var page = this.paginadorValue.page;
    var rows = this.paginadorValue.rows;
    var search = this.nameSearch ? `search=${this.nameSearch}&` : '';
    var query = `?${search}page=${page}&size=${rows}`;
    this.apiService.getAll(Endpoint.products + query).subscribe((res) => {
      this.setPaginadorValue(page, rows, res.total);
      this.data = res.data;
    });
  }

  newRegister() {
    const ref = this.dialogService.open(NuevoProductoComponent, {
      header: 'Nuevo producto',
      styleClass: 'modal-drume-lg',
      // width: '60%',
      // showHeader: false,
    });
    ref.onClose.subscribe((response) => {
      if (response) {
        this.getProducts();
      }
    });
  }

  verEdit(item) {}

  confirm(item) {}
}
