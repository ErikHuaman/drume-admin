import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Subscription } from 'rxjs';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private infoSubscription!: Subscription;
  constructor(
    private apiService: ApiService,
    private headerService: HeaderService
  ) {}

  public loadInfo() {
    return new Promise<void>((resolve, reject) => {
      this.infoSubscription = this.apiService.getInformation().subscribe({
        next: (res) => {
          this.headerService.info = res.data;
          resolve();
        },
        error: (e) => {
          resolve();
        },
      });
    });
  }
}
