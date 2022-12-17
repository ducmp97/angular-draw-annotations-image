import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ExportImageService extends BaseService {
  //url call api
  private exportUrl: string;

  constructor(injector: Injector) {
    super(injector);
    this.exportUrl = `${this.serviceUrl}/export`;
  }

  exportImage(imageUrl: string) {
    return this.http.post<any>(`${this.exportUrl}/image`, imageUrl);
  }
}
