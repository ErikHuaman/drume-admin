import { Component, OnInit } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
  Title,
} from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { MessageGlobalService } from 'src/app/core/services/message-global.service';

declare var $;

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styles: [
    `
      .note-editable p {
        margin-bottom: 1rem !important;
      }

      .svg-preview {
        border: 1px solid #ccc;
        width: 6rem;
        height: 6rem;
      }

      .svg-preview svg {
        max-height: 100%;
      }
      .svg-preview img {
        max-height: 100%;
      }
    `,
  ],
})
export class EmpresaComponent implements OnInit {
  listConfig = [
    { key: 'about', label: 'Nosotros' },
    { key: 'terms', label: 'Términos y condiciones' },
    { key: 'changes', label: 'Política de cambios' },
    { key: 'shipments', label: 'Política de envíos' },
    { key: 'sizes', label: 'Tabla de tallas' },
    { key: 'faq', label: 'Preguntas frecuentes' },
  ];

  selected = 'about';
  prevSelected = 'about';

  html: String = '';

  data = {
    name: '',
    description: '',
    logo: '',
    icono: '',
    email: '',
    address: '',
    about: '',
  };
  textHTML: SafeHtml;

  logoPreview: SafeHtml;
  iconoPreview: SafeResourceUrl;

  constructor(
    private titleService: Title,
    public _h: HeaderService,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private msg: MessageGlobalService,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) {
    _h.setTitle(this.route.snapshot.data['title']);
    const title = this.route.snapshot.data['title']
      ? ' - ' + this.route.snapshot.data['title']
      : '';
    this.titleService.setTitle('Administrador Drumé ' + title);
  }

  ngAfterViewInit() {
    $('#summernote').summernote({
      lang: 'es-ES',
      height: 450,
    });
  }

  ngOnInit(): void {
    this.apiService.getInformation().subscribe({
      next: (res) => {
        this.data = res.data;
        this.initEditor(this.data[this.selected]);
        this.logoPreview = this.data.logo
          ? this.sanitizer.bypassSecurityTrustHtml(this.data.logo)
          : '';
        this.iconoPreview = this.data.logo
          ? this.sanitizer.bypassSecurityTrustResourceUrl(this.data.icono)
          : '';
      },
    });
  }

  get superU(): boolean {
    return this.authService.superU;
  }

  initEditor(value = '') {
    $('#summernote').summernote('code', value);
  }

  onChange(value) {
    this.data[this.prevSelected] = $('#summernote').summernote('code');
    if (this.prevSelected != this.selected) {
      this.initEditor(this.data[this.selected]);
      this.prevSelected = this.selected;
    }
  }

  onLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Leer el archivo SVG como texto
      const reader = new FileReader();
      reader.onload = () => {
        this.data.logo = reader.result as string;
        this.logoPreview = this.sanitizer.bypassSecurityTrustHtml(this.data.logo);
      };
      reader.readAsText(file);
    }
  }

  onIconoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (file.type === 'image/x-icon') {
        const reader = new FileReader();

        reader.onload = () => {
          this.data.icono = reader.result as string;
          this.iconoPreview = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.data.icono
          );
          console.log('this.iconoPreview', this.iconoPreview);
        };

        reader.readAsDataURL(file); // Leer como Data URL
      } else {
        console.error('El archivo seleccionado no es un archivo .ico válido.');
      }
    }
  }

  save() {
    this.data[this.selected] = $('#summernote').summernote('code');

    this.apiService.updateInformation(this.data).subscribe({
      next: (res) => {
        this.msg.success(res.msg);
      },
      error: (res) => {
        this.msg.error(res.error.msg);
      },
    });
  }
}
