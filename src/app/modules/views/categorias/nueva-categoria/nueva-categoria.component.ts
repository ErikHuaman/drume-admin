import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { getBase64 } from 'src/app/core/helpers';
import { ApiService } from 'src/app/core/services/api.service';
import { MessageGlobalService } from 'src/app/core/services/message-global.service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './nueva-categoria.component.html',
})
export class NuevaCategoriaComponent implements OnInit {
  mediaUrl = environment.mediaUrl;

  submited: boolean = false;

  data = {
    id: null,
    name: null,
    image: null,
    coverImage: null,
  };

  image: any;
  coverImage: any;
  preview: string;
  previewCover: string;

  isEdit: boolean = false;

  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;

  @ViewChild('fileCoverUpload', { static: false }) fileCoverUpload: ElementRef;

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
      this.data.name = config.data.name;

      this.preview = this.mediaUrl + config.data.image;
      this.previewCover = this.mediaUrl + config.data.coverImage;
    }
  }

  ngOnInit(): void {
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

  captureCoverImage(event: any) {
    const files: FileList = event.target.files || event.dataTransfer.files;
    const maxFileSize = 1 * 1024 * 1024; // 10 MB
    if (files[0] && files[0].size > maxFileSize) {
      this.fileCoverUpload.nativeElement.value = '';
      this.msg.warn('El tamaño del archivo supera el límite máximo.');
      return;
    }

    this.previewCover = null;
    this.coverImage = null;

    getBase64(files[0], this.sanitizer).then(
      (data: { blob: any; image: any; base: string }) => {
        this.previewCover = data.base;
        this.coverImage = files[0];
        this.fileCoverUpload.nativeElement.value = '';
        this.msg.success('Imagen Cargada');
      }
    );
  }

  get invalidForm(): boolean {
    return !this.data.name;
  }

  save() {
    this.submited = true;

    if (this.invalidForm) {
      return;
    }

    this.data.image = this.image;
    this.data.coverImage = this.coverImage;

    if (!this.isEdit) {
      
      this.apiService.save(this.data, Endpoint.categories, true).subscribe({
        next: (res) => {
          this.msg.success(res.msg);
          
          this.ref.close(true);
        },
        error: (res) => {
          this.msg.error(res.error.msg);
          
        },
      });
    } else {
      
      this.apiService.edit(this.data, Endpoint.categories, true).subscribe({
        next: (res) => {
          this.msg.success(res.msg);
          
          this.ref.close(true);
        },
        error: (res) => {
          this.msg.error(res.error.msg);
          
        },
      });
    }
  }

  cancel() {
    this.ref.close();
  }
}
