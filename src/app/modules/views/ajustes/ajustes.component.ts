import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styles: [
    `
      .acordeon {
        padding: 0;
        border: none;
      }

      .acordeon-leyenda {
        display: block;
        padding: 10px;
        font-weight: bold;
        cursor: pointer;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f7f7f7;
        transition: background-color 0.3s ease;
      }

      .acordeon-contenido {
        display: none;
        padding: 10px;
        border: 1px solid #ccc;
        border-top: none;
        border-radius: 0 0 5px 5px;
        background-color: #fff;
      }

      .acordeon-leyenda:focus,
      .acordeon-leyenda:hover {
        background-color: #ebebeb;
      }

      .acordeon-leyenda:focus + .acordeon-contenido,
      .acordeon-leyenda:hover + .acordeon-contenido,
      .acordeon-leyenda:focus-within + .acordeon-contenido {
        display: block;
      }
    `,
  ],
})
export class AjustesComponent implements OnInit {
  constructor(
    private titleService: Title,
    public _h: HeaderService,
    private route: ActivatedRoute
  ) {
    _h.setTitle(this.route.snapshot.data['title']);
    const title = this.route.snapshot.data['title']
      ? ' - ' + this.route.snapshot.data['title']
      : '';
    this.titleService.setTitle('Administrador Drumé ' + title);
  }

  ngOnInit(): void {}
}
