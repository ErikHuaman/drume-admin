import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { pad } from 'src/app/core/helpers';
import { PaginadorValue } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { MessageGlobalService } from 'src/app/core/services/message-global.service';
import { ConfirmarPedidoComponent } from '../componentes/confirmar-pedido/confirmar-pedido.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
})
export class PendientesComponent implements OnInit {
  mediaUrl = environment.mediaUrl;

  nameSearch: string;

  paginadorValue: PaginadorValue = new PaginadorValue();
  data: any[] = [];
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

  setPad(number, length) {
    return pad(number, length);
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
    var query = `?${search}page=${page}&size=${rows}&state=1`;
    this.msg.loading(true);
    this.apiService.getAll(Endpoint.orders + query).subscribe({
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

  editItem(item) {
    const ref = this.dialogService.open(ConfirmarPedidoComponent, {
      header: 'Pedido pendiente de pago',
      styleClass: 'modal-drume-md',
      data: item,
    });
    ref.onClose.subscribe((response) => {
      this.getData();
    });
  }

  declineItem(item) {
    this.msg.confirm({
      header: 'Rechazar pedido',
      message: `¿Estás seguro de rechazar el pedido #${this.setPad(
        item.id,
        4
      )}?`,
      accept: () => {
        this.msg.loading(true);
        this.apiService.decline(item.id).subscribe({
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
