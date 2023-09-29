import { Injectable } from '@angular/core';
import { Confirmation, Message } from 'primeng/api';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageGlobalService {
  private _msg: Subject<Message> = new Subject();
  private _confim: Subject<Confirmation> = new Subject();
  private _loading: Subject<boolean> = new Subject();

  subsMessage(): Observable<Message> {
    return this._msg.asObservable();
  }

  subsConfirm(): Observable<Confirmation> {
    return this._confim.asObservable();
  }

  addMsg(msg: Message) {
    this._msg.next(msg);
  }

  subsLoading(): Observable<boolean> {
    return this._loading.asObservable();
  }

  loading(loading: boolean) {
    setTimeout(() => {
      this._loading.next(loading);
    });
  }

  confirm(confirm: Confirmation) {
    (confirm.acceptButtonStyleClass =
      confirm.acceptButtonStyleClass ?? 'p-button-sm btn-gray-700'),
      (confirm.rejectButtonStyleClass =
        confirm.rejectButtonStyleClass ?? 'p-button-sm p-button-danger'),
      this._confim.next(confirm);
  }

  error(msg: string) {
    this.addMsg({ severity: 'error', detail: msg });
  }

  info(msg: string) {
    this.addMsg({ severity: 'info', detail: msg });
  }

  success(msg: string) {
    this.addMsg({ severity: 'success', detail: msg });
  }

  warn(msg: string) {
    this.addMsg({ severity: 'warn', detail: msg });
  }
}
