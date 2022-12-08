import { Component, OnInit } from '@angular/core';
import * as markerjs2 from 'markerjs2';
import { MarkerService } from '../event-bus/marker.service';

@Component({
  selector: 'app-create-annotation',
  templateUrl: './create-annotation.component.html',
  styleUrls: ['./create-annotation.component.scss'],
})
export class CreateAnnotationComponent implements OnInit {
  //save position marker
  private marker: any;
  //save marker config
  private markerArea: any;
  constructor(
    //create event bus data
    private markerService: MarkerService
  ) {}

  ngOnInit(): void {}

  clickButtonCreate() {
    const sampleImage = document.getElementById('create');
    if (sampleImage) {
      this.showMarkerArea(sampleImage);
    }
  }

  clickButtonEdit() {
    let sampleImage: any = document.getElementById('create');
    //reset url image
    sampleImage.src = '../../assets/image.jpg';
    if (sampleImage) {
      this.resetmarketArea(sampleImage);
    }
  }

  resetmarketArea(target: any) {
    this.markerArea.addEventListener('render', (event: any) => {
      target.src = event.dataUrl;
    });
    this.markerArea.show();
    if (
      this.marker &&
      this.marker !== undefined &&
      JSON.stringify(this.marker) !== JSON.stringify({})
    ) {
      this.markerArea.restoreState(this.marker);
    }
  }

  showMarkerArea(target: any) {
    this.markerArea = new markerjs2.MarkerArea(target);
    this.markerArea.uiStyleSettings.hideToolbox = true;
    this.markerArea.addEventListener('render', (event: any) => {
      target.src = event.dataUrl;
      this.markerService.createMarker(event.state);
      this.marker = event.state;
    });
    this.markerArea.show();
  }
}
