import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(
    private titleService: Title,
    public _h: HeaderService,
    private route: ActivatedRoute
  ) {
    _h.setTitle(route.snapshot.data['title']);
    const title = route.snapshot.data['title']
      ? ' - ' + route.snapshot.data['title']
      : '';
    this.titleService.setTitle('Administrador Drumé ' + title);
  }

  dataList = [
    { color: 'blue', value: 10, title: 'Productos' },
    { color: 'green', value: 10, title: 'Pedidos' },
    { color: 'orange', value: 10, title: 'Ventas' },
    { color: 'red', value: 10, title: 'Rechazados' },
  ];

  colors: any;
  colorOptions: any;
  ventasData: any;
  ventasOptions: any;

  ngOnInit(): void {
    this.ventasData = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#42A5F5',
          tension: 0,
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#FFA726',
          tension: 0,
        },
      ],
    };

    this.ventasOptions = {
      plugins: {
        title: {
          display: true,
          text: 'Ventas Históricas',
          fontSize: 16,
        },
        legend: {
          position: 'bottom',
          labels: {
            color: '#495057',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
      },
      responsive: true,
    };

    this.colors = {
      datasets: [
        {
          label: 'My dataset',
          data: [68, 58, 80, 82, 48],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(255, 205, 86, 0.5)',
            'rgba(201, 203, 207, 0.5)',
            'rgba(54, 162, 235, 0.5)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(201, 203, 207)',
            'rgb(54, 162, 235)',
          ],
          borderWidth: 1,
        },
      ],
      labels: ['Rojo', 'Verde', 'Amarillo', 'Gris', 'Azul'],
    };

    this.colorOptions = {
      plugins: {
        title: {
          display: true,
          text: 'Colores más vendidos',
          fontSize: 16,
        },
        legend: {
          display: false,
          position: 'bottom',
          labels: {
            color: '#495057',
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      responsive: true,
    };
  }
}
