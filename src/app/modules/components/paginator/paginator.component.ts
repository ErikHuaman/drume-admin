import { Component, OnInit, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { PaginadorValue } from 'src/app/core/models';
@Component({
  selector: 'paginator-drume',
  templateUrl: './paginator.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PaginatorComponent,
      multi: true,
    },
  ],
})
export class PaginatorComponent implements OnInit, ControlValueAccessor {
  @Input() rowsPerPageOptions = [10, 25, 50];

  config = {
    first: 0,
    last: 0,
    page: '0',
  };

  @Output() change = new EventEmitter<PaginadorValue>();

  paginadorValue: PaginadorValue = {
    page: 1,
    rows: 10,
    totalRecords: 0,
  };

  isDisabled = false;

  disabledAll: boolean = true;
  disabledFirst: boolean = true;
  disabledPrev: boolean = true;
  disabledNext: boolean = true;
  disabledLast: boolean = true;

  constructor() {}

  private onChange!: Function;

  onTouched: any = () => {};

  writeValue(value: PaginadorValue): void {
    if (value) {
      this.paginadorValue = value;
      this.getCurrentPageReport();
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit(): void {}

  changerows($event) {
    this.getCurrentPageReport();
    this.change.emit(this.paginadorValue);
  }

  getCurrentPageReport() {
    this.disabledAll = this.paginadorValue.totalRecords == 0;
    this.config.first = this.disabledAll
      ? 0
      : this.paginadorValue.rows * (this.paginadorValue.page - 1) + 1;

    this.config.last =
      this.paginadorValue.totalRecords <
      this.paginadorValue.rows * this.paginadorValue.page
        ? this.paginadorValue.totalRecords
        : this.paginadorValue.rows * this.paginadorValue.page;

    this.disabledFirst = this.config.first == 1;
    this.disabledPrev = this.config.first == 1;
    this.disabledNext = this.config.last == this.paginadorValue.totalRecords;
    this.disabledLast = this.config.last == this.paginadorValue.totalRecords;

    this.config.page = this.paginadorValue.page.toString();
  }

  toFirst() {
    this.paginadorValue.page = 1;
    this.getCurrentPageReport();
    this.change.emit(this.paginadorValue);
  }

  toPrev() {
    this.paginadorValue.page--;
    this.getCurrentPageReport();
    this.change.emit(this.paginadorValue);
  }

  toNext() {
    this.paginadorValue.page++;
    this.getCurrentPageReport();
    this.change.emit(this.paginadorValue);
  }

  toLast() {
    this.paginadorValue.page = Math.round(
      this.paginadorValue.totalRecords / this.paginadorValue.rows
    );
    this.getCurrentPageReport();
    this.change.emit(this.paginadorValue);
  }
}
