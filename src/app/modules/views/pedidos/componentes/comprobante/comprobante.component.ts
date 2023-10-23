import { Component, Input, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { ApiService } from 'src/app/core/services/api.service';
import { MessageGlobalService } from 'src/app/core/services/message-global.service';

@Component({
  selector: 'comprobante-drume',
  templateUrl: './comprobante.component.html',
})
export class ComprobanteComponent implements OnInit {
  @Input() hash: string;

  constructor(
    private apiService: ApiService,
    private msg: MessageGlobalService
  ) {}

  ngOnInit(): void {}

  generarComprobante() {
    
    this.apiService.getComprobante(this.hash).subscribe({
      next: (blob: Blob) => {
        
        saveAs(blob, 'comprobante_pago.pdf');
      },
      error: (res) => {
        this.msg.error(res.error.msg);
        
      },
    });
  }
}
