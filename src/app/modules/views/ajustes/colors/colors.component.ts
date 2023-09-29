import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { ColorModel, PaginadorValue } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';
import { NuevoColorComponent } from './nuevo-color/nuevo-color.component';
import { Title } from '@angular/platform-browser';
import { HeaderService } from 'src/app/core/services/header.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessageGlobalService } from 'src/app/core/services/message-global.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styles: [
    `
      .square {
        width: 6rem;
        height: 2rem;
      }
    `,
  ],
})
export class ColorsComponent implements OnInit {
  mediaUrl = environment.mediaUrl;

  data: ColorModel[] = [];

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
    this.msg.loading(true);
    this.apiService.getAll(Endpoint.colors + query).subscribe({
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

  newRegister() {
    const ref = this.dialogService.open(NuevoColorComponent, {
      header: 'Nuevo Color',
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
    const ref = this.dialogService.open(NuevoColorComponent, {
      header: 'Editar Color',
      styleClass: 'modal-drume-sm',
      data: item,
    });
    ref.onClose.subscribe((response) => {
      if (response) {
        this.getData();
      }
    });
  }

  confirm(item) {}
}
