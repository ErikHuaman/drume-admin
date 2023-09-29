import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { formatDate, parseDate } from 'src/app/core/helpers';
import { ApiService } from 'src/app/core/services/api.service';
import { MessageGlobalService } from 'src/app/core/services/message-global.service';

@Component({
  templateUrl: './nuevo-banner.component.html',
})
export class NuevoBannerComponent implements OnInit {
  submited: boolean = false;

  routeList: any[] = [];

  date: Date;

  data = {
    id: null,
    title: null,
    url: null,
    expire: null,
  };
  isEdit: boolean;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private apiService: ApiService,
    private msg: MessageGlobalService
  ) {
    if (config.data) {
      this.isEdit = true;
      console.log(config.data);
      this.data.id = config.data.id;
      this.data.title = config.data.title;
      this.data.url = config.data.url;

      this.date = parseDate(config.data.expire);
    }
  }

  ngOnInit(): void {
    this.apiService.getRoutes().subscribe((res) => {
      this.routeList = res.data;
    });
  }

  save() {
    this.submited = true;
    if (!this.data.title) {
      return;
    }

    this.data.expire = formatDate(this.date);
    if (!this.isEdit) {
      this.msg.loading(true);
      this.apiService.save(this.data, Endpoint.banners).subscribe({
        next: (res) => {
          this.msg.success(res.msg);
          this.ref.close(true);
          this.msg.loading(false);
        },
        error: (res) => {
          this.msg.error(res.error.msg);
          this.msg.loading(false);
        },
      });
    } else {
      this.msg.loading(true);
      this.apiService.edit(this.data, Endpoint.banners).subscribe({
        next: (res) => {
          this.msg.success(res.msg);
          this.ref.close(true);
          this.msg.loading(false);
        },
        error: (res) => {
          console.log(res);
          this.msg.error(res.error.msg);
          this.msg.loading(false);
        },
      });
    }
  }

  cancel() {
    this.ref.close();
  }
}
