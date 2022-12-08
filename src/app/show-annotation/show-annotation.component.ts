import { Component, OnInit } from '@angular/core';
import * as markerjs2 from 'markerjs2';
import { MarkerService } from '../event-bus/marker.service';

@Component({
  selector: 'app-show-annotation',
  templateUrl: './show-annotation.component.html',
  styleUrls: ['./show-annotation.component.scss'],
})
export class ShowAnnotationComponent implements OnInit {
  constructor(private markerService: MarkerService) {}

  ngOnInit(): void {
    let sampleImage: any = document.getElementById('show-image');
    this.markerService.marker$.subscribe((marker) => {
      if (marker) {
        sampleImage.src = '../../assets/image.jpg';
        if (sampleImage) {
          this.resetmarketArea(sampleImage, marker);
        }
      }
    });
  }

  resetmarketArea(target: any, marker: any) {
    if (
      marker &&
      marker !== undefined &&
      JSON.stringify(marker) !== JSON.stringify({})
    ) {
      const markerArea = new markerjs2.MarkerArea(target);
      markerArea.uiStyleSettings.hideToolbar = true;
      markerArea.uiStyleSettings.hideToolbox = true;
      markerArea.settings.disableRotation = true;

      markerArea.addEventListener('render', (event) => {
        target.src = event.dataUrl;
      });
      markerArea.show();
      markerArea.restoreState(marker);
      markerArea.startRenderAndClose();
    }
  }
}
