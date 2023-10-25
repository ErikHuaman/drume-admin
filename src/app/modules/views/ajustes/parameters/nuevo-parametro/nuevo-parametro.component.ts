import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Endpoint } from 'src/app/core/constants/endpoint.constants';
import { ParameterModel } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';
import { MessageGlobalService } from 'src/app/core/services/message-global.service';

@Component({
  selector: 'app-nuevo-parametro',
  templateUrl: './nuevo-parametro.component.html'
})
export class NuevoParametroComponent implements OnInit {
  submited: boolean = false;
  data: ParameterModel = new ParameterModel();
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
      this.data.value = config.data.value;

      this.isEdit = true;
    }
  }
  ngOnInit(): void {
  }

  save() {
    this.submited = true;
    if (!this.data.name || !this.data.value) {
      return;
    }

    console.log(this.data);

    if (!this.isEdit) {
      
      this.apiService.save(this.data, Endpoint.parameter).subscribe(
        (res) => {
          this.msg.success(res.msg);
          
          this.ref.close(true);
        },
        (error) => {
          this.msg.error(error.msg);
          
        }
      );
    } else {
      
      this.apiService.edit(this.data, Endpoint.parameter).subscribe(
        (res) => {
          this.msg.success(res.msg);
          
          this.ref.close(true);
        },
        (error) => {
          this.msg.error(error.msg);
          
        }
      );
    }
  }

  cancel() {
    this.ref.close();
  }

}
