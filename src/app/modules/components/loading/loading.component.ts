import { Component, Input, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'drume-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  @Input() loading: boolean = false;

  constructor() {}

  ngOnInit(): void {
    $('body').css('overflow', '');
  }
}
