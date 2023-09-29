import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { PaginadorValue } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { MessageGlobalService } from 'src/app/core/services/message-global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.scss'],
})
export class MultimediaComponent implements OnInit {
  mediaUrl = environment.mediaUrl;

  data: { id?: number; name: string; url: string; btn: boolean }[] = [];

  showDropArea = false;

  showUpload = false;

  nameSearch: string;

  paginadorValue: PaginadorValue = new PaginadorValue();

  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;

  constructor(
    private titleService: Title,
    public _h: HeaderService,
    private route: ActivatedRoute,
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
    this.apiService.getAll(Endpoint.multimedia + query).subscribe({
      next: (res) => {
        console.log('data', res);
        this.setPaginadorValue(page, rows, res.total);
        this.data = res.data;
      },
      error: (res) => {
        console.log('error', res);
      },
    });
    // this.apiService.getAll(Endpoint.multimedia).subscribe({
    //   next: (res) => {
    //     console.log('data', res);
    //     this.imageList = res.data;
    //   },
    //   error: (res) => {
    //     console.log('error', res);
    //   },
    // });
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files || event.dataTransfer.files;
    const maxFileSize = 1 * 1024 * 1024; // 10 MB
    if (files[0] && files[0].size > maxFileSize) {
      this.fileUpload.nativeElement.value = '';
      this.msg.warn('El tamaño del archivo supera el límite máximo.');
      return;
    }

    if (files[0]) {
      this.msg.loading(true);
      this.apiService
        .save({ image: files[0] }, Endpoint.multimedia, true)
        .subscribe({
          next: (res) => {
            this.getData();
            this.msg.success('Medio creado con éxito');
            this.msg.loading(false);
          },
          error: (res) => {
            this.msg.success('No se pudo completar la carga');
            this.msg.loading(false);
          },
        });
    }

    // const files: FileList = event.target.files || event.dataTransfer.files;
    // for (let i = 0; i < files.length; i++) {
    //   const file = files[i];
    //   const reader = new FileReader();

    //   reader.onload = (e) => {
    //     this.imageList.push({
    //       name: file.name,
    //       url: reader.result as string,
    //       btn: false,
    //     });
    //   };

    //   reader.readAsDataURL(file);
    // }
  }

  onDragOver(event: any) {
    event.preventDefault();
    this.showDropArea = true;
  }

  onDragLeave(event: any) {
    event.preventDefault();
    // this.showDropArea = false;
  }

  onDrop(event: any) {
    event.preventDefault();
    this.showDropArea = false;
    this.onFileSelected(event);
  }

  copyItem(image: any) {
    const el = document.createElement('textarea');
    el.value = this.mediaUrl + image.url;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    image.btn = true;
    setTimeout(() => {
      image.btn = false;
    }, 1500);
  }

  deleteItem(id: number) {
    this.msg.confirm({
      header: 'Eliminar',
      message: '¿Estás seguro de eliminar el medio seleccionado?',
      accept: () => {
        this.msg.loading(true);
        this.apiService.delete(id, Endpoint.multimedia).subscribe({
          next: (res) => {
            this.getData();
            this.msg.success('Eliminado con éxito');
            this.msg.loading(false);
          },
          error: (res) => {
            this.msg.error('No se pudo eliminar');
            this.msg.loading(false);
          },
        });
      },
    });
  }
}
