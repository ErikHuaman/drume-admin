import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { formatDate, parseDate } from 'src/app/core/helpers';
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

  date: Date;
  isEdit: boolean = false;

  constructor(
    private datePipe: DatePipe,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private apiService: ApiService,
    private msg: MessageGlobalService
  ) {
    if (config.data) {
      this.isEdit = true;

      this.data.id = config.data.id;
      this.data.name = config.data.name;
      this.data.typeId = config.data.typeId;
      this.data.fixed = config.data.fixed;
      this.data.quantity = config.data.quantity;
      this.data.quantityPay = config.data.quantityPay;
      this.data.percent = config.data.percent * 100;
      this.data.code = config.data.code;

      this.date = parseDate(config.data.expire);
    }
  }

  ngOnInit(): void {
    this.getTypes();
  }

  getTypes() {
    
    this.apiService.getAll(Endpoint.types).subscribe({
      next: (res) => {
        this.list = res.data;
        
      },
      error: (res) => {
        this.msg.error(res.error.msg);
        
      },
    });
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
        if (
          !this.data.percent ||
          this.data.percent < 0 ||
          this.data.percent > 100
        ) {
          this.msg.warn('Ingresa un porcentaje entre 0 y 100');
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

    this.data.expire = formatDate(this.date);

    if (!this.isEdit) {
      
      this.apiService.save(this.data, Endpoint.discounts).subscribe({
        next: (res) => {
          this.msg.success(res.msg);
          
          this.ref.close(true);
        },
        error: (res) => {
          console.log(res.error.msg);
          
        },
      });
    } else {
      
      this.apiService.edit(this.data, Endpoint.discounts).subscribe({
        next: (res) => {
          this.msg.success(res.msg);
          
          this.ref.close(true);
        },
        error: (res) => {
          console.log(res.error.msg);
          
        },
      });
    }
  }

  cancel() {
    this.ref.close();
  }
}
