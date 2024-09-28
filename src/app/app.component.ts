import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { iconNames, pathIcons } from './core/constants/icons.constants';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessageGlobalService } from './core/services/message-global.service';
import { HeaderService } from './core/services/header.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MessageService, ConfirmationService],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'drume-admin';

  private _unsubscribeAll: Subject<any> = new Subject();

  private messageService: MessageService;
  private confirmationService: ConfirmationService;
  private msg: MessageGlobalService;
  loading: boolean = false;

  constructor(
    private meta: Meta,
    private iconReg: SvgIconRegistryService,
    private injector: Injector,
    private headerService: HeaderService
  ) {
    this.messageService = this.injector.get<MessageService>(MessageService);

    this.confirmationService =
      this.injector.get<ConfirmationService>(ConfirmationService);

    this.msg = this.injector.get<MessageGlobalService>(MessageGlobalService);
  }

  ngOnInit(): void {
    this.setMetaTags();
    this.loadIcons();

    this.showMessage();
    this.showConfirm();
    this.subLoading();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  setMetaTags(): void {
    this.meta.addTags([
      { name: 'description', content: this.headerService.info.description },
      { name: 'keywords', content: this.headerService.info.keywords },
      { property: 'og:title', content: this.headerService.info.title },
      {
        property: 'og:description',
        content: this.headerService.info.description,
      },
    ]);
    if (this.headerService.info.icono) {
      const link: HTMLLinkElement = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/x-icon';
      link.href = this.headerService.info.icono;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  }

  loadIcons() {
    iconNames.forEach((icon) => {
      this.iconReg
        .loadSvg(`${pathIcons}${icon.url}.svg`, icon.name)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe();
    });

    let logoUrl = `${pathIcons}logo.svg`;

    if (this.headerService.info.logo) {
      const blob = new Blob([this.headerService.info.logo], {
        type: 'image/svg+xml',
      });
      logoUrl = URL.createObjectURL(blob);
    }

    this.iconReg
      .loadSvg(logoUrl, 'logo')
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe();
  }

  private showMessage() {
    this.msg
      .subsMessage()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (message) => this.messageService.add(message),
        (e) => console.log('Error al mostrar el mensaje', e)
      );
  }

  private showConfirm() {
    this.msg
      .subsConfirm()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (confirm) => this.confirmationService.confirm(confirm),
        (e) => console.log('Error al mostrar el confirm', e)
      );
  }

  private subLoading() {
    this.msg
      .subsLoading()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (loading) => (this.loading = loading),
        (e) => console.log('Error al mostrar el loading', e)
      );
  }
}
