import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  title: string = '';

  private _info: any;

  showSidebar: boolean = true;
  showMobile: boolean = false;

  constructor() {}

  setTitle(val: string) {
    this.title = val;
  }

  setSidebar() {
    this.showSidebar = !this.showSidebar;
    this.showMobile = !this.showMobile;
  }

  set info(val: any) {
    this._info = val;
  }

  get info() {
    return this._info;
  }
}
