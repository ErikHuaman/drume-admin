import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { keyPressNumbers, pad } from 'src/app/core/helpers';
import { ApiService } from 'src/app/core/services/api.service';
import { MessageGlobalService } from 'src/app/core/services/message-global.service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './detalle-pedido.component.html',
})
export class DetallePedidoComponent implements OnInit {
  mediaUrl = environment.mediaUrl;

  order: any;

  data = {
    id: null,
    state: null,
    tracking: null,
    emision: null,
  };

  confirm: boolean = false;
  buttonLabel: string;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private apiService: ApiService,
    private msg: MessageGlobalService
  ) {
    this.order = config.data;
    this.data.id = this.order.id;

    this.getButtonLabel();
  }

  ngOnInit(): void {}

  setPad(number, length) {
    return pad(number, length);
  }

  getButtonLabel() {
    this.data.state =
      this.order.stateId == 2 ? 3 : this.order.shipMethod == 'delivery' ? 4 : 5;
    this.buttonLabel =
      this.order.stateId == 2
        ? 'Preparar pedido'
        : this.order.shipMethod == 'delivery'
        ? 'Pedido enviado'
        : 'Pedido listo';
  }

  keyPress(event) {
    return keyPressNumbers(event);
  }

  get invalid() {
    return (
      !this.confirm ||
      (this.order.stateId == 3 &&
        this.order.shipMethod == 'delivery' &&
        (!this.data.emision || !this.data.tracking))
    );
  }

  save() {
    if (this.invalid) {
      return;
    }

    
    this.apiService.orderStatus(this.data).subscribe({
      next: (res) => {
        this.msg.success(res.msg);
        
        if (this.data.state == 3) {
          this.order.stateId = 3;
          this.getButtonLabel();
          this.confirm = false;
        } else {
          this.ref.close(true);
        }
      },
      error: (res) => {
        this.msg.error(res.error.msg);
        
      },
    });
  }

  cancel() {
    this.ref.close(true);
  }
}
