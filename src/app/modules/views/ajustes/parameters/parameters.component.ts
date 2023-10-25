import { Component, OnInit } from '@angular/core';
import { NuevoParametroComponent } from './nuevo-parametro/nuevo-parametro.component';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { PaginadorValue, ParameterModel } from 'src/app/core/models';
import { environment } from 'src/environments/environment';
import { DialogService } from 'primeng/dynamicdialog';
import { ApiService } from 'src/app/core/services/api.service';
import { MessageGlobalService } from 'src/app/core/services/message-global.service';
import { Title } from '@angular/platform-browser';
import { HeaderService } from 'src/app/core/services/header.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html'
})
export class ParametersComponent implements OnInit {

  mediaUrl = environment.mediaUrl;

  data: ParameterModel[] = [];

  nameSearch: string;

  paginadorValue: PaginadorValue = new PaginadorValue();

  constructor(
    private titleService: Title,
    public _h: HeaderService,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private dialogService: DialogService,
    private msg: MessageGlobalService
  ) {
    _h.setTitle(this.route.snapshot.data['title']);
    const title = this.route.snapshot.data['title']
      ? ' - ' + this.route.snapshot.data['title']
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
    
    this.apiService.getAll(Endpoint.parameter + query).subscribe({
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
    const ref = this.dialogService.open(NuevoParametroComponent, {
      header: 'Nueva Talla',
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
    const ref = this.dialogService.open(NuevoParametroComponent, {
      header: 'Editar Talla',
      styleClass: 'modal-drume-sm',
      data: item,
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
      } el parametro "${item.name}"?`,
      accept: () => {
        this.apiService.changeStatus(item.id, Endpoint.parameter).subscribe({
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

  toNumber(val: string): number{
    return Number(val);
  }
}
