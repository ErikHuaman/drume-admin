import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  title: string = '';

  showSidebar: boolean = true;

  constructor() {}

  setTitle(val: string) {
    this.title = val;
  }

  setSidebar() {
    this.showSidebar = !this.showSidebar;
  }
}
