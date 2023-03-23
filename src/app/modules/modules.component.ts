import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../core/services/header.service';

@Component({
  template: ` <div class="w-100 d-flex">
    <div
      class="w-12.5r d-none d-md-block {{
        _h.showSidebar ? 'd-md-block' : 'd-md-none'
      }}"
    >
      <sidebar-drume></sidebar-drume>
    </div>
    <div class="w-100 min-vh-100">
      <header-drume></header-drume>
      <main class="d-flex flex-column flex-grow-1 px-2 px-lg-4 py-4">
        <router-outlet></router-outlet>
      </main>
    </div>
  </div>`,
})
export class ModulesComponent implements OnInit {
  constructor(public _h: HeaderService) {}

  ngOnInit(): void {}
}
