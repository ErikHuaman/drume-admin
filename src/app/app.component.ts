import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { iconNames, pathIcons } from './core/constants/icons.constants';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { filter, Subject, takeUntil } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessageGlobalService } from './core/services/message-global.service';

declare var $: any;

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
    private iconReg: SvgIconRegistryService,
    private injector: Injector
  ) {
    this.messageService = this.injector.get<MessageService>(MessageService);

    this.confirmationService =
      this.injector.get<ConfirmationService>(ConfirmationService);

    this.msg = this.injector.get<MessageGlobalService>(MessageGlobalService);
  }

  ngOnInit(): void {
    this.loadIcons();

    this.showMessage();
    this.showConfirm();
    this.subLoading();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  loadIcons() {
    iconNames.forEach((icon) => {
      this.iconReg
        .loadSvg(pathIcons + icon.url + '.svg', icon.name)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe();
    });
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
