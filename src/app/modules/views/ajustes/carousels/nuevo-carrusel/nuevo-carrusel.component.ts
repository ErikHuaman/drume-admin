import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { formatDate, getBase64, parseDate } from 'src/app/core/helpers';
import { ApiService } from 'src/app/core/services/api.service';
import { MessageGlobalService } from 'src/app/core/services/message-global.service';

@Component({
  templateUrl: './nuevo-carrusel.component.html',
})
export class NuevoCarruselComponent implements OnInit {
  submited: boolean = false;

  date: Date;

  data = {
    id: null,
    title: null,
    description: null,
    image: null,
    url: null,
    expire: null,
  };

  isEdit: boolean = false;

  routeList: any[] = [];

  image: any;
  preview: string;

  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;

  constructor(
    private sanitizer: DomSanitizer,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private apiService: ApiService,
    private msg: MessageGlobalService
  ) {
    if (config.data) {
      this.isEdit = true;

      this.data.id = config.data.id;
      this.data.title = config.data.title;
      this.data.description = config.data.description;
      this.data.url = config.data.url;

      this.preview = config.data.urlApi + config.data.image;

      this.date = parseDate(config.data.expire);
    }
  }

  ngOnInit(): void {
    this.apiService.getRoutes().subscribe((res) => {
      this.routeList = res.data;
    });
  }

  captureImage(event: any) {
    const files: FileList = event.target.files || event.dataTransfer.files;
    const maxFileSize = 1 * 1024 * 1024; // 10 MB
    if (files[0] && files[0].size > maxFileSize) {
      this.fileUpload.nativeElement.value = '';
      this.msg.warn('El tamaño del archivo supera el límite máximo.');
      return;
    }

    this.preview = null;
    this.image = null;

    getBase64(files[0], this.sanitizer).then(
      (data: { blob: any; image: any; base: string }) => {
        this.preview = data.base;
        this.image = files[0];
        this.fileUpload.nativeElement.value = '';
        this.msg.success('Imagen Cargada');
      }
    );
  }

  invalid(): boolean {
    return !this.data.title || !this.preview;
  }

  save() {
    // this.submited = true;

    console.log('invalid', this.invalid());

    if (this.invalid()) {
      return;
    }

    this.data.expire = formatDate(this.date);
    this.data.image = this.image;

    console.log(this.data);

    if (!this.isEdit) {
      
      this.apiService.save(this.data, Endpoint.carousels, true).subscribe({
        next: (res) => {
          this.msg.success(res.msg);
          this.ref.close(true);
          
        },
        error: (e) => {
          this.msg.error(e.error.msg);
          
        },
      });
    } else {
      
      this.apiService.edit(this.data, Endpoint.carousels, true).subscribe({
        next: (res) => {
          this.msg.success(res.msg);
          
          this.ref.close(true);
        },
        error: (e) => {
          this.msg.error(e.error.msg);
          
        },
      });
    }
  }

  cancel() {
    this.ref.close();
  }
}
