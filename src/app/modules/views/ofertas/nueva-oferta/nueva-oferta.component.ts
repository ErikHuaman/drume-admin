import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { DiscountModel, TypeModel } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';
import { MessageGlobalService } from 'src/app/core/services/message-global.service';

@Component({
  templateUrl: './nueva-oferta.component.html',
})
export class NuevaOfertaComponent implements OnInit {
  list: TypeModel[] = [];

  submited: boolean = false;

  data: DiscountModel = new DiscountModel();

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private apiService: ApiService,
    private msg: MessageGlobalService
  ) {}

  ngOnInit(): void {
    this.getTypes();
  }

  getTypes() {
    this.apiService.getAll(Endpoint.types).subscribe(
      (res) => {
        console.log(res.data);
        this.list = res.data;
      },
      (error) => {
        this.msg.error(error);
      }
    );
  }

  changeType(event) {
    this.data.percent = null;
    this.data.fixed = null;
    this.data.code = null;
    this.data.quantity = null;
    this.data.quantityPay = null;
  }

  save() {
    this.submited = true;

    if (!this.data.typeId || !this.data.name) {
      return;
    }

    switch (this.data.typeId) {
      case 1:
        if (!this.data.percent) {
          return;
        }
        break;
      case 2:
        if (!this.data.fixed) {
          return;
        }
        break;
      case 3:
        if (!this.data.quantity || !this.data.quantityPay) {
          return;
        }
        break;
      case 4:
        if (!this.data.code || !this.data.fixed) {
          return;
        }
        break;
    }

    console.log(this.data);

    this.apiService.save(this.data, Endpoint.discounts).subscribe(
      (res) => {
        this.msg.success(res.msg);
        this.ref.close(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancel() {
    this.ref.close();
  }
}
