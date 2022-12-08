import { Component, OnInit } from '@angular/core';
import * as markerjs2 from 'markerjs2';

@Component({
  selector: 'app-draw-annotation',
  templateUrl: './draw-annotation.component.html',
  styleUrls: ['./draw-annotation.component.scss'],
})
export class DrawAnnotationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  showMarkerArea(target: any) {
    const markerArea = new markerjs2.MarkerArea(target);
    // markerArea.uiStyleSettings.hideToolbar = false;
    markerArea.uiStyleSettings.hideToolbox = true;
    markerArea.settings.disableRotation = true;
    markerArea.addEventListener('render', (event) => {
      target.src = event.dataUrl;
      console.log('event: ', JSON.stringify(event.state));
    });
    markerArea.show();
  }
}
