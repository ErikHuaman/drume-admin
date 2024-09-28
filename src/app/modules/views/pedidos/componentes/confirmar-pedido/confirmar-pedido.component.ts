import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { pad } from 'src/app/core/helpers';
import { ApiService } from 'src/app/core/services/api.service';
import { MessageGlobalService } from 'src/app/core/services/message-global.service';

@Component({
  templateUrl: './confirmar-pedido.component.html',
})
export class ConfirmarPedidoComponent implements OnInit {
  order: any;
  listMethods = [];
  data = {
    id: null,
    state: 2,
    method: null,
  };
  confirm: boolean = false;
  constructor(
    private sanitizer: DomSanitizer,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private apiService: ApiService,
    private msg: MessageGlobalService
  ) {
    this.order = config.data;
    this.data.id = this.order.id;

    this.data.method = this.order.payCode == "Izipay" ? "Izipay" : null;

    this.listMethods =
    this.order.payMethod == 'deposito'
        ? ['BANCO DE LA NACIÓN', 'BCP', 'INTERBANK', 'SCOTIABANK', 'BBVA']
        : this.order.payMethod == 'yapeplin' ? ['YAPE', 'PLIN'] : ["Izipay"];
  }

  ngOnInit(): void {}

  setPad(number, length) {
    return pad(number, length);
  }

  save() {
    if (!this.data.method || !this.confirm) {
      return;
    }
    
    this.apiService.orderStatus(this.data).subscribe({
      next: (res) => {
        this.msg.success(res.msg);
        this.ref.close(true);
        
      },
      error: (res) => {
        this.msg.error(res.error.msg);
        
      },
    });
  }

  cancel() {
    this.ref.close();
  }
}
