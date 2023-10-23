import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUpload } from 'primeng/fileupload';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { getBase64 } from 'src/app/core/helpers';
import { CategoryModel } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';
import { MessageGlobalService } from 'src/app/core/services/message-global.service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './nueva-coleccion.component.html',
})
export class NuevaColeccionComponent implements OnInit {
  mediaUrl = environment.mediaUrl;
  listCategories: CategoryModel[] = [];

  submited: boolean = false;

  data = {
    id: null,
    categoryId: null,
    name: null,
    shortName: null,
    image: null,
  };

  image: any;
  preview: string;

  isEdit: boolean = false;

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
      this.data.categoryId = config.data.categoryId;
      this.data.name = config.data.name;
      this.data.shortName = config.data.shortName;

      this.preview = this.mediaUrl + config.data.image;
    }
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    
    this.apiService.getAll(Endpoint.categories).subscribe({
      next: (res) => {
        this.listCategories = res.data;
        
      },
      error: (res) => {
        this.msg.error(res.error.msg);
        
      },
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
    return !this.data.categoryId || !this.data.name;
  }

  save() {
    this.submited = true;

    if (this.invalid()) {
      return;
    }

    this.data.image = this.image;

    if (!this.isEdit) {
      
      this.apiService.save(this.data, Endpoint.collections, true).subscribe({
        next: (res) => {
          this.msg.success(res.msg);
          
          this.ref.close(true);
        },
        error: (res) => {
          this.msg.error(res.error.msg);
          
        },
      });
    } else {
      
      this.apiService.edit(this.data, Endpoint.collections, true).subscribe({
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
