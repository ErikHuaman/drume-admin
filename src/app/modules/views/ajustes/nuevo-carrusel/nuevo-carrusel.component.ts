import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { formatDate, getBase64 } from 'src/app/core/functions';
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
  ) {}

  ngOnInit(): void {
    this.apiService.getRoutes().subscribe((res) => {
      this.routeList = res.data;
    });
  }

  captureImage(event: any) {
    this.preview = null;
    this.image = null;
    getBase64(event.target.files[0], this.sanitizer).then(
      (data: { blob: any; image: any; base: string }) => {
        this.preview = data.base;
        this.image = event.target.files[0];
        this.fileUpload.nativeElement.value = '';
        this.msg.success('Imagen Cargada');
      }
    );
  }

  save() {
    this.submited = true;
    if (!this.data.title || !this.image) {
      return;
    }

    this.data.expire = formatDate(this.date);
    this.data.image = this.image;

    console.log(this.data);

    this.apiService.save(this.data, Endpoint.carousels, true).subscribe(
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
