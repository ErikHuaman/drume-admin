import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { ApiService } from 'src/app/core/services/api.service';
import { MessageGlobalService } from 'src/app/core/services/message-global.service';

@Component({
  selector: 'app-gestionar-stock',
  templateUrl: './gestionar-stock.component.html',
  styles: [
    `
      .rectangle {
        width: 5rem;
      }
    `,
  ],
})
export class GestionarStockComponent implements OnInit {
  name: string;
  data: {
    id: number;
    name: string;
    stock: number;
    add: boolean;
    value: number;
    modify: boolean;
  }[] = [];
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private apiService: ApiService,
    private msg: MessageGlobalService
  ) {
    if (config.data) {
      console.log(config.data);
      this.name = config.data.name;

      this.data = config.data.colorsizes.map((i) => ({
        id: i.id,
        name: i.size.name,
        stock: i.stock,
        add: true,
        value: 0,
        modify: false,
      }));
    }
  }

  ngOnInit(): void {}

  get invalid(): boolean {
    return (
      this.data.some((i) => {
        return (!i.add && i.value > i.stock) || false;
      }) ||
      this.data.every((i) => {
        return i.value == 0;
      })
    );
  }

  save() {
    if (this.invalid) {
      return;
    }
    this.msg.loading(true);
    this.apiService
      .stock(
        this.data.map((i) => {
          if (typeof i.value == 'string') {
            i.value = Number.parseInt(i.value);
          }
          return i;
        })
      )
      .subscribe({
        next: (res) => {
          this.msg.success(res.msg);
          this.msg.loading(false);
          this.ref.close(true);
        },
        error: (res) => {
          this.msg.error(res.error.msg);
          this.msg.loading(false);
        },
      });
  }

  cancel() {
    this.ref.close();
  }

  keyPressNumbers(event) {
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
}
