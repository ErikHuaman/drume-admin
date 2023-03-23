import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { formatDate } from 'src/app/core/functions';
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

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private apiService: ApiService,
    private msg: MessageGlobalService
  ) {}

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

    this.apiService.save(this.data, Endpoint.banners).subscribe(
      (res) => {
        this.msg.success(res.msg);
        this.ref.close(true);
      },
      (error) => {
        this.msg.error(error.msg);
      }
    );
  }

  cancel() {
    this.ref.close();
  }
}
