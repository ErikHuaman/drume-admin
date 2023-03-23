import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dash-card',
  templateUrl: './dash-card.component.html',
  styleUrls: ['./dash-card.component.scss'],
})
export class DashCardComponent implements OnInit {
  @Input() data = {
    title: 'Card',
    value: 0,
    color: 'blue',
  };

  constructor() {}

  ngOnInit(): void {}
}
