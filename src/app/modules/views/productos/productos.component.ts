import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { PaginadorValue, ProductModel } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';
import { GestionarStockComponent } from './gestionar-stock/gestionar-stock.component';
import { MessageGlobalService } from 'src/app/core/services/message-global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
})
export class ProductosComponent implements OnInit {
  mediaUrl = environment.mediaUrl;
  data: ProductModel[] = [];

  nameSearch: string;

  paginadorValue: PaginadorValue = new PaginadorValue();

  constructor(
    private titleService: Title,
    public _h: HeaderService,
    private route: ActivatedRoute,
    public dialogService: DialogService,
    private apiService: ApiService,
    private msg: MessageGlobalService
  ) {
    _h.setTitle(route.snapshot.data['title']);
    const title = route.snapshot.data['title']
      ? ' - ' + route.snapshot.data['title']
      : '';
    this.titleService.setTitle('Administrador Drumé ' + title);
  }

  ngOnInit(): void {
    this.getData();
  }

  buscar(): void {
    if (this.nameSearch) {
      this.getData();
    }
  }

  limpiar() {
    if (this.nameSearch) {
      this.nameSearch = null;
      this.getData();
    }
  }

  setPaginadorValue(page: number, rows: number, total: number) {
    this.paginadorValue = new PaginadorValue();
    this.paginadorValue.rows = rows;
    this.paginadorValue.page = page;
    this.paginadorValue.totalRecords = total;
  }

  getData() {
    var page = this.paginadorValue.page;
    var rows = this.paginadorValue.rows;
    var search = this.nameSearch ? `search=${this.nameSearch}&` : '';
    var query = `?${search}page=${page}&size=${rows}`;
    this.msg.loading(true);
    this.apiService.getAll(Endpoint.products + query).subscribe({
      next: (res) => {
        this.setPaginadorValue(page, rows, res.total);
        this.data = res.data;
        this.msg.loading(false);
      },
      error: (res) => {
        this.msg.error(res.error.msg);
        this.msg.loading(false);
      },
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
        this.getData();
      }
    });
  }

  setStock(item) {
    console.log('item', item);
    const ref = this.dialogService.open(GestionarStockComponent, {
      header: 'Gestionar Stock',
      styleClass: 'modal-drume-sm',
      data: { name: item.name, colorsizes: item.productColors[0].colorSizes },
    });
    ref.onClose.subscribe((response) => {
      if (response) {
        this.getData();
      }
    });
  }

  editItem(item) {
    const ref = this.dialogService.open(NuevoProductoComponent, {
      header: 'Modificar producto',
      styleClass: 'modal-drume-lg',
      data: item,
    });
    ref.onClose.subscribe((response) => {
      if (response) {
        this.getData();
      }
    });
  }

  cloneItem(item) {
    const ref = this.dialogService.open(NuevoProductoComponent, {
      header: 'Nuevo producto',
      styleClass: 'modal-drume-lg',
      data: { ...item, isClone: true },
    });
    ref.onClose.subscribe((response) => {
      if (response) {
        this.getData();
      }
    });
  }

  changeStatus(item) {
    this.msg.confirm({
      header: 'Eliminar',
      message: `¿Estás seguro de ${
        !item.active ? 'ACTIVAR' : 'DESACTIVAR'
      } el producto "${item.name}"?`,
      accept: () => {
        this.msg.loading(true);
        this.apiService.changeStatus(item.id, Endpoint.products).subscribe({
          next: (res) => {
            this.msg.success(res.msg);
            this.getData();
            this.msg.loading(false);
          },
          error: (res) => {
            this.msg.success(res.error.msg);
            this.msg.loading(false);
          },
        });
      },
      reject: () => {
        item.active = !item.active;
      },
    });
  }

  deleteItem(item) {
    this.msg.confirm({
      header: 'Eliminar',
      message: `¿Estás seguro de eliminar el producto ${item.name}?`,
      accept: () => {
        this.msg.loading(true);
        this.apiService.delete(item.id, Endpoint.products).subscribe({
          next: (res) => {
            this.msg.success(res.msg);
            this.getData();
            this.msg.loading(false);
          },
          error: (res) => {
            this.msg.success(res.error.msg);
            this.msg.loading(false);
          },
        });
      },
    });
  }
}
