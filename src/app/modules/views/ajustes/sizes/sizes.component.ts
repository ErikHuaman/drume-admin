import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { PaginadorValue, SizeModel } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';
import { NuevaTallaComponent } from './nueva-talla/nueva-talla.component';
import { environment } from 'src/environments/environment';
import { MessageGlobalService } from 'src/app/core/services/message-global.service';

@Component({
  selector: 'app-sizes',
  templateUrl: './sizes.component.html',
})
export class SizesComponent implements OnInit {
  mediaUrl = environment.mediaUrl;

  data: SizeModel[] = [];

  nameSearch: string;

  paginadorValue: PaginadorValue = new PaginadorValue();

  constructor(
    private dialogService: DialogService,
    private apiService: ApiService,
    private msg: MessageGlobalService
  ) {}

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
    
    this.apiService.getAll(Endpoint.sizes + query).subscribe({
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
    const ref = this.dialogService.open(NuevaTallaComponent, {
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
    const ref = this.dialogService.open(NuevaTallaComponent, {
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

  confirm(item) {}
}
