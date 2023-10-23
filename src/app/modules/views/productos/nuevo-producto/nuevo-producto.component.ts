import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { getBase64 } from 'src/app/core/helpers';
import {
  CategoryModel,
  CollectionModel,
  ColorModel,
  SizeModel,
} from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';
import { MessageGlobalService } from 'src/app/core/services/message-global.service';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  templateUrl: './nuevo-producto.component.html',
})
export class NuevoProductoComponent implements OnInit, OnDestroy {
  mediaUrl = environment.mediaUrl;

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
    id: null,
    name: null,
    colorId: null,
    collectionId: null,
    sizes: null,
    price: null,
    description: `
    <p>Polera de algodón &nbsp;Tangüis.</p>
    <ul>
      <li>TEJIDO: Franela</li>
      <li>REACTIVO (no destiñe)&nbsp;</li>
      <li>PRELAVADO (no encoge)</li>
      <li>Perchado interior</li>
    </ul>
    <p>
      <i>*IMAGEN Y COLOR&nbsp;REFERENCIAL: Los colores de la imagen puede variar en base a su dispositivo teniendo en cuenta el
      tono de color y/o a la configuración de pantalla así como los niveles de iluminación.
      </i>
    </p>`,
    image: null,
    gallery: [],
  };

  color: ColorModel;

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

  isClone: any;

  constructor(
    private sanitizer: DomSanitizer,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private apiService: ApiService,
    private msg: MessageGlobalService
  ) {
    if (config.data) {
      this.isClone = config.data.isClone;

      console.log(config.data);
      this.data.id = this.isClone ? null : config.data.id;
      this.data.name = config.data.name;
      this.data.description = config.data.description;
      this.data.price = config.data.productColors[0].price;
      this.previewList = this.isClone
        ? []
        : config.data.productColors[0].gallery?.map((i) => this.mediaUrl + i);
      this.preview = this.isClone
        ? null
        : this.mediaUrl + config.data.productColors[0].image;
    }
  }

  ngOnInit(): void {
    this.getSizes();
    this.getCategories();
    this.getColors();
  }

  ngOnDestroy(): void {}

  getColors() {
    
    this.apiService.getAll(Endpoint.colors).subscribe({
      next: (res) => {
        this.listColors = res.data;
        
        setTimeout(() => {
          if (this.config.data) {
            this.data.name = this.data.name.replace(
              ` ${
                this.listColors.find(
                  (i) => i.id == this.config.data.productColors[0].colorId
                ).name
              }`,
              ''
            );

            this.color = this.isClone
              ? null
              : this.listColors.find(
                  (i) => i.id == this.config.data.productColors[0].colorId
                );
            this.data.colorId = this.isClone
              ? null
              : this.config.data.productColors[0].colorId;
          }
        }, 0);
      },
      error: (res) => {
        console.log(res);
        this.msg.error(res.error.msg);
        
      },
    });
  }

  getCategories() {
    
    this.apiService.getAll(Endpoint.categories).subscribe({
      next: (res) => {
        this.listCategories = res.data;
        
        setTimeout(() => {
          if (this.config.data) {
            this.category = this.config.data.collection.categoryId;
            this.listCollections = this.listCategories.find(
              (item) => item.id == this.config.data.collection.categoryId
            ).collections;
            setTimeout(() => {
              this.data.collectionId = this.config.data.collection.id;
            }, 0);
          }
        }, 0);
      },
      error: (res) => {
        console.log(res);
        this.msg.error(res.error.msg);
        
      },
    });
  }

  changeColor(event) {
    this.data.colorId = this.color.id;
  }

  changeCategory(id: number) {
    this.data.collectionId = null;
    this.listCollections = this.listCategories.find(
      (item) => item.id == id
    ).collections;
  }

  getSizes() {
    
    this.apiService.getAll(Endpoint.sizes).subscribe({
      next: (res) => {
        this.listSizes = res.data;
        
        setTimeout(() => {
          if (this.config.data) {
            this.sizes = this.config.data.productColors[0].colorSizes.map(
              (c) => c.sizeId
            );
          }
        }, 0);
      },
      error: (res) => {
        console.log(res);
        this.msg.error(res.error.msg);
        
      },
    });
  }

  captureImage(event) {
    const files: FileList = event.target.files || event.dataTransfer.files;
    const maxFileSize = 1 * 1024 * 1024; // 10 MB
    if (files[0] && files[0].size > maxFileSize) {
      this.fileImage.nativeElement.value = '';
      this.msg.warn('El tamaño del archivo supera el límite máximo.');
      return;
    }

    this.preview = null;
    this.image = null;

    getBase64(files[0], this.sanitizer).then(
      (data: { blob: any; image: any; base: string }) => {
        this.preview = data.base;
        this.image = files[0];
        this.fileImage.nativeElement.value = '';
        this.msg.success('Imagen Cargada');
      }
    );
  }

  captureGallery(event) {
    const files: FileList = event.target.files || event.dataTransfer.files;
    const maxFileSize = 1 * 1024 * 1024; // 10 MB
    if (files[0] && files[0].size > maxFileSize) {
      this.fileGallery.nativeElement.value = '';
      this.msg.warn('El tamaño del archivo supera el límite máximo.');
      return;
    }

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

  get invalid(): boolean {
    return (
      !this.data.name ||
      !this.data.description ||
      !this.data.colorId ||
      !this.data.collectionId ||
      !this.data.price ||
      !this.sizes ||
      this.sizes.length == 0
    );
  }

  save() {
    this.submited = true;

    if (this.invalid) {
      this.msg.warn('Hay campos incompletos');
      return;
    }

    this.data.image = this.image;
    this.data.gallery = this.gallery;
    this.data.sizes = JSON.stringify(this.sizes);

    if (this.data.id) {
      
      this.apiService
        .edit(
          {
            ...this.data,
            gallerylist: this.previewList.filter((i) => !i.startsWith('data:')),
          },
          Endpoint.products,
          true
        )
        .subscribe({
          next: (res) => {
            this.msg.success(res.msg);
            
            this.ref.close(true);
          },
          error: (res) => {
            console.log(res);
            this.msg.error(res.error.msg);
            
          },
        });
    } else {
      
      this.apiService.save(this.data, Endpoint.products, true).subscribe({
        next: (res) => {
          this.msg.success(res.msg);
          
          this.ref.close(true);
        },
        error: (res) => {
          console.log(res);
          this.msg.error(res.error.msg);
          
        },
      });
    }
  }

  cancel() {
    this.ref.close();
  }
}
