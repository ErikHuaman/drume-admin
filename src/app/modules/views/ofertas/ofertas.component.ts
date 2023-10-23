import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { CollectionModel, PaginadorValue } from 'src/app/core/models';
import { DiscountModel } from 'src/app/core/models/discount.model';
import { ApiService } from 'src/app/core/services/api.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { NuevaOfertaComponent } from './nueva-oferta/nueva-oferta.component';
import { MessageGlobalService } from 'src/app/core/services/message-global.service';
import { VincularOfertaComponent } from './vincular-oferta/vincular-oferta.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
})
export class OfertasComponent implements OnInit {
  mediaUrl = environment.mediaUrl;

  data: DiscountModel[] = [];

  nameSearch: string;

  paginadorValue: PaginadorValue = new PaginadorValue();

  constructor(
    private titleService: Title,
    public _h: HeaderService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
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
    this.data = [];
    var page = this.paginadorValue.page;
    var rows = this.paginadorValue.rows;
    var search = this.nameSearch ? `search=${this.nameSearch}&` : '';
    var query = `?${search}page=${page}&size=${rows}`;
    
    this.apiService.getAll(Endpoint.discounts + query).subscribe({
      next: (res) => {
        this.setPaginadorValue(page, rows, res.total);
        this.data = res.data;
        
      },
      error: (res) => {
        this.msg.error(res.error.msg);
        
      },
    });
  }

  newRegister() {
    const ref = this.dialogService.open(NuevaOfertaComponent, {
      header: 'Nuevo Descuento',
      styleClass: 'modal-drume-sm',
      // width: '60%',
      // showHeader: false,
    });
    ref.onClose.subscribe((response) => {
      if (response) {
        this.getData();
      }
    });
  }

  editItem(item) {
    const ref = this.dialogService.open(NuevaOfertaComponent, {
      header: 'Editar Descuento',
      styleClass: 'modal-drume-sm',
      data: item,
    });
    ref.onClose.subscribe((response) => {
      if (response) {
        this.getData();
      }
    });
  }

  addProducts() {
    const ref = this.dialogService.open(VincularOfertaComponent, {
      header: 'Vincular Descuentos',
      styleClass: 'modal-drume-lg',
      // width: '60%',
      // showHeader: false,
    });
    ref.onClose.subscribe((response) => {
      if (response) {
      }
    });
  }

  changeStatus(item) {
    this.msg.confirm({
      header: 'Eliminar',
      message: `¿Estás seguro de ${
        !item.active ? 'ACTIVAR' : 'DESACTIVAR'
      } la oferta con id: ${item.id}?`,
      accept: () => {
        this.apiService.changeStatus(item.id, Endpoint.discounts).subscribe({
          next: (res) => {
            this.msg.success(`¡${ !item.active ? 'ACTIVADO' : 'DESACTIVADO' } con éxito!`);
            this.getData();
          },
          error: (res) => {
            this.msg.success(res.error.msg);
          },
        });
      },
    });
  }

  deleteItem(item) {
    this.msg.confirm({
      header: 'Eliminar',
      message: `¿Estás seguro de eliminar la oferta con id: ${item.id}?`,
      accept: () => {
        this.apiService.delete(item.id, Endpoint.discounts).subscribe({
          next: (res) => {
            this.msg.success(res.msg);
            this.getData();
          },
          error: (res) => {
            this.msg.success(res.error.msg);
          },
        });
      },
    });
  }
}
