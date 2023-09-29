import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { ColorModel } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';
import { MessageGlobalService } from 'src/app/core/services/message-global.service';

@Component({
  selector: 'app-nuevo-color',
  templateUrl: './nuevo-color.component.html',
  styles: [
    `
      .square {
        width: 6rem;
        height: 2rem;
      }
    `,
  ],
})
export class NuevoColorComponent implements OnInit {
  submited: boolean = false;
  data: ColorModel = new ColorModel();
  isEdit: boolean = false;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private apiService: ApiService,
    private msg: MessageGlobalService
  ) {
    if (config.data) {
      this.data.id = config.data.id;
      this.data.name = config.data.name;
      this.data.code = config.data.code;

      this.isEdit = true;
    }
  }

  ngOnInit(): void {}

  save() {
    this.submited = true;
    if (!this.data.name || !this.data.code) {
      return;
    }

    console.log(this.data);

    if (!this.isEdit) {
      this.msg.loading(true);
      this.apiService.save(this.data, Endpoint.colors).subscribe(
        (res) => {
          this.msg.success(res.msg);
          this.msg.loading(false);
          this.ref.close(true);
        },
        (error) => {
          this.msg.error(error.msg);
          this.msg.loading(false);
        }
      );
    } else {
      this.msg.loading(true);
      this.apiService.edit(this.data, Endpoint.colors).subscribe(
        (res) => {
          this.msg.success(res.msg);
          this.msg.loading(false);
          this.ref.close(true);
        },
        (error) => {
          this.msg.error(error.msg);
          this.msg.loading(false);
        }
      );
    }
  }

  cancel() {
    this.ref.close();
  }
}
