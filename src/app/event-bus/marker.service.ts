import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  private _marker = new BehaviorSubject<any>({});
  public readonly marker$ = this._marker.asObservable();
  constructor() {}

  createMarker(marker: any) {
    this._marker.next(marker);
  }
}
