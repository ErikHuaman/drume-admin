import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
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
    about: '',
  };
  textHTML: SafeHtml;

  constructor(
    private titleService: Title,
    public _h: HeaderService,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private msg: MessageGlobalService,
    private sanitizer: DomSanitizer
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
        $('#summernote').summernote('code', this.data[this.selected]);
      },
    });
  }

  onChange(value) {
    this.data[this.prevSelected] = $('#summernote').summernote('code');
    if (this.prevSelected != this.selected) {
      $('#summernote').summernote('code', this.data[this.selected]);
      this.prevSelected = this.selected;
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
