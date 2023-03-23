import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { getBase64 } from 'src/app/core/functions';
import {
  CategoryModel,
  CollectionModel,
  ColorModel,
  SizeModel,
} from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';
import { MessageGlobalService } from 'src/app/core/services/message-global.service';

@Component({
  templateUrl: './nuevo-producto.component.html',
})
export class NuevoProductoComponent implements OnInit, OnDestroy {
  editor = ClassicEditor;

  configEditor = {
    placeholder: 'Escriba la descripción aquí!',
    toolbar: [
      'bold',
      'italic',
      'bulletedList',
      'numberedList',
      '|',
      'insertTable',
      'outdent',
      'indent',
      '|',
      'undo',
      'redo',
      // 'uploadImage',
    ],
  };

  listCategories: CategoryModel[] = [];

  listCollections: CollectionModel[] = [];

  listColors: ColorModel[] = [];

  data = {
    name: null,
    colorId: null,
    collectionId: null,
    sizes: null,
    price: null,
    description:
      '<p>Polera de algodón &nbsp;Tangüis.</p><ul><li>TEJIDO: Franela</li><li>REACTIVO (no destiñe)&nbsp;</li><li>PRELAVADO (no encoge)</li><li>Perchado interior</li></ul><p><i>*IMAGEN Y COLOR&nbsp;REFERENCIAL</i></p>',
    image: null,
    gallery: [],
  };

  color: ColorModel;

  html: string = '';

  category: any;

  image: any;

  gallery: any[] = [];

  preview: string;

  listSizes: SizeModel[] = [];

  sizes: SizeModel[];

  previewList: string[] = [];
  submited: boolean = false;

  @ViewChild('fileImage', { static: false }) fileImage: ElementRef;

  @ViewChild('fileGallery', { static: false }) fileGallery: ElementRef;

  constructor(
    private sanitizer: DomSanitizer,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private apiService: ApiService,
    private msg: MessageGlobalService
  ) {}

  ngOnInit(): void {
    this.getSizes();
    this.getCategories();
    this.getColors();
  }

  ngOnDestroy(): void {}

  getColors() {
    this.apiService.getAll(Endpoint.colors).subscribe(
      (res) => {
        this.listColors = res.data;
      },
      (error) => {
        this.msg.error('No se pudo cargar las categorías');
      }
    );
  }

  getCategories() {
    this.apiService.getAll(Endpoint.categories).subscribe(
      (res) => {
        this.listCategories = res.data;
      },
      (error) => {
        this.msg.error('No se pudo cargar las categorías');
      }
    );
  }

  changeColor(event) {
    this.data.colorId = this.color.id;
  }

  changeCategory(id: number) {
    this.data.collectionId = null;
    console.log(this.listCategories.find((item) => item.id == id));
    this.listCollections = this.listCategories.find(
      (item) => item.id == id
    ).collections;
  }

  getCollections() {
    this.apiService.getAll(Endpoint.collections).subscribe(
      (res) => {
        this.listCollections = res.data;
      },
      (error) => {
        this.msg.error('No se pudo cargar las colecciones');
      }
    );
  }

  getSizes() {
    this.apiService.getAll(Endpoint.sizes).subscribe(
      (res) => {
        this.listSizes = res.data;
      },
      (error) => {
        this.msg.error('No se pudo cargar las tallas');
      }
    );
  }

  captureImage(event) {
    this.preview = null;
    this.image = null;
    getBase64(event.target.files[0], this.sanitizer).then(
      (data: { blob: any; image: any; base: string }) => {
        this.preview = data.base;
        this.image = event.target.files[0];
        this.fileImage.nativeElement.value = '';
        this.msg.success('Imagen Cargada');
      }
    );
  }

  captureGallery(event) {
    getBase64(event.target.files[0], this.sanitizer).then(
      (data: { blob: any; image: any; base: string }) => {
        this.previewList.push(data.base);
        this.gallery.push(event.target.files[0]);
        this.fileGallery.nativeElement.value = '';
        this.msg.success('Imagen Cargada');
      }
    );
  }

  removeImg(index) {
    this.previewList.splice(index, 1);
    this.gallery.splice(index, 1);
  }

  save() {
    this.submited = true;

    if (
      !this.data.name ||
      !this.data.description ||
      !this.data.colorId ||
      !this.data.collectionId ||
      !this.data.price ||
      !this.sizes ||
      this.sizes.length == 0
    ) {
      return;
    }

    this.data.image = this.image;
    this.data.gallery = this.gallery;
    this.data.sizes = JSON.stringify(this.sizes);

    this.apiService.save(this.data, Endpoint.products, true).subscribe(
      (res) => {
        this.msg.success(res.msg);
        this.ref.close(true);
      },
      (error) => {
        this.msg.error(error.msg);
        console.log(error);
      }
    );
  }

  cancel() {
    this.ref.close();
  }
}
