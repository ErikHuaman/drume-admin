import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'header-drume',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  constructor(
    public titleService: Title,
    public _h: HeaderService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  expand() {
    this._h.setSidebar();
  }
}
