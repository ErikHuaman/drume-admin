import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUpload } from 'primeng/fileupload';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { getBase64 } from 'src/app/core/functions';
import { CategoryModel } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';
import { MessageGlobalService } from 'src/app/core/services/message-global.service';

@Component({
  templateUrl: './nueva-coleccion.component.html',
})
export class NuevaColeccionComponent implements OnInit {
  listCategories: CategoryModel[] = [];

  submited: boolean = false;

  data = {
    categoryId: null,
    name: null,
    image: null,
  };

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
    this.getCategories();
  }

  getCategories() {
    this.apiService.getAll(Endpoint.categories).subscribe(
      (res) => {
        console.log(res.data);
        this.listCategories = res.data;
      },
      (error) => {
        this.msg.error(error);
      }
    );
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

    if (!this.data.categoryId || !this.data.name) {
      return;
    }

    this.data.image = this.image;

    this.apiService.save(this.data, Endpoint.collections, true).subscribe(
      (res) => {
        this.msg.success(res.msg);
        this.ref.close(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancel() {
    this.ref.close();
  }
}
