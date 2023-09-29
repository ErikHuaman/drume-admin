import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../core/services/header.service';

@Component({
  template: `
    <div class="w-100 d-flex">
      <div class="sidebar bg-gray-900" [ngClass]="{ active: _h.showSidebar }">
        <sidebar-drume></sidebar-drume>
      </div>
      <div class="main" [ngClass]="{ active: _h.showSidebar }">
        <header-drume></header-drume>
        <main class="main-outlet">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
    <p-dialog
      class="d-block d-md-none bg-gray-900"
      styleClass="sidebar-mobile w-12.5r vh-100"
      [(visible)]="_h.showMobile"
      position="left"
      [draggable]="false"
      [resizable]="false"
      [modal]="true"
      [dismissableMask]="true"
    >
      <ng-template pTemplate="header">
        <div class="w-100 d-flex justify-content-end p-2">
          <button
            type="button"
            class="btn btn-dark border text-white fs-4"
            (click)="_h.showMobile = false"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </ng-template>

      <sidebar-drume></sidebar-drume>
    </p-dialog>
  `,
})
export class ModulesComponent implements OnInit {
  constructor(public _h: HeaderService) {}

  ngOnInit(): void {}
}
